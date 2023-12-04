import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import findAvailableTables from "./findAvailableTables";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, partysize, time } = req.query as {
      slug: string;
      day: string;
      partysize: string;
      time: string;
    };

    const{bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOccasion, bookerRequest} = req.body as {
      bookerEmail: string;
      bookerPhone: string;
      bookerFirstName: string;
      bookerLastName: string;
      bookerOccasion: string;
      bookerRequest: string
    }

    const errors:string[] = [];
    const validatorSchema = [
        {valid: validator.isLength(bookerFirstName, {min:1, max:20}), errorMessage: "First name is invalid"},
        {valid: validator.isLength(bookerLastName, {min:1, max:20}), errorMessage: "Last name is invalid"},
        {valid: validator.isEmail(bookerEmail), errorMessage: "Email is invalid"},
        {valid: validator.isMobilePhone(bookerPhone), errorMessage: "Phone is invalid"},

    ];
    validatorSchema.forEach(check => {
        if(!check.valid)
            errors.push(check.errorMessage);
    });
 

    const allTablesAtRestaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true
      },
    });

    if (!allTablesAtRestaurant) {
      return res
        .status(400)
        .json({ errorMessage: "Restaurtant doesn't exists" });
    }

    if (
      new Date(`${day}T${allTablesAtRestaurant.open_time}`) >=
        new Date(`${day}T${time}`) ||
      new Date(`${day}T${allTablesAtRestaurant.close_time}`) <=
        new Date(`${day}T${time}`)
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Outside restaurant open timings" });
    }

    const searchTimesWithTables = await findAvailableTables({
      time,
      day,
      res,
      allTablesAtRestaurant,
    });

    if (!searchTimesWithTables) {
      return res
        .status(400)
        .json({
          errorMessage: "Search times not valid. Please select another time.",
        });
    }
    const searchTimeTable = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    }); //check if the time chosen is within available slot. if so then check if count of seats based on tables.

    if (searchTimeTable === undefined) {
      return res
        .status(400)
        .json({ errorMessage: "No availability, cannot book" });
    }

    // assumption - tables will always be either 2 or 4 people
    const tablesCount: {
      2: number[];
      4: number[];
    } = {
      2: [],
      4: [],
    };
    searchTimeTable.tables.forEach((table) => {
      if (table.seats === 2) {
        tablesCount[2].push(table.id);
      } else {
        tablesCount[4].push(table.id);
      }
    });

    let seatsRequired = parseInt(partysize);
    const tablesToBook: number[] = [];

    // start booking the required no of tables(4 seater/2 seater) based on no of seats required
    while (seatsRequired > 0) {
      if (seatsRequired >= 3) {
        if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRequired = seatsRequired - 4;
        } else {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRequired = seatsRequired - 2;
        }
      } else {
        if (tablesCount[2].length) {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRequired = seatsRequired - 2;
        } else {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRequired = seatsRequired - 4;
        }
      }
    }
    
     // if filteredtime is available then reserve by creating a record in booking table
    const booking = await prisma.booking.create({
        data: {
          number_of_people: parseInt(partysize),
          booker_first_name: bookerFirstName,
          booker_last_name: bookerLastName,
          booker_email :bookerEmail,
          booker_phone : bookerPhone,
          booker_occassion: bookerOccasion,
          booker_request: bookerRequest,
          booking_time: new Date(`${day}T${time}`),
          restaurant_id: allTablesAtRestaurant.id
        },
      });

      // map all the booking to all the tables involved in booking
    const bookingsOnTables = tablesToBook.map((tbl) => { 
      return {
      table_id: tbl,
      booking_id : booking.id
    }
  });

  await prisma.booking_Table.createMany({
    data: bookingsOnTables
  });
    return res.status(200).json({ booking: booking });
    // return res.status(200).json({slug, day, partysize, time})
    //return res.status(200).json({"blah":'blah'});
  }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cusine-ottawa/reserve?day=2023-05-27&partysize=4&time=15:00:00.000Z