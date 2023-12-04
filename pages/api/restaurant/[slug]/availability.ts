import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import findAvailableTables from "./findAvailableTables";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partysize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partysize: string;
    };

    //console.log(slug, day, time, partySize);

    if (
      slug.length <= 0 ||
      day.length <= 0 ||
      time.length <= 0 ||
      partysize.length <= 0
    ) {
      return res.status(400).json({ errorMessage: "Invalid request" });
    }

    const allTablesAtRestaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!allTablesAtRestaurant) {
      return res.status(400).json({ errorMessage: "Invalid Data" });
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
    // now sum up all the seats available and check against the partySize for the slot availability
    const availabilitySlots = searchTimesWithTables
      .map((searchTime) => {
        const sumSeats = searchTime.tables.reduce((seatSum, searchTime) => {
          return searchTime.seats + seatSum;
        }, 0);
        return {
          time: searchTime.time,
          available: sumSeats >= parseInt(partysize),
        }; // filter these slots to check these fall within restaurant open and close timings
      })
      .filter((availability) => {
        const beforeOpeningTime =
          new Date(`${day}T${availability.time}`) >=
          new Date(`${day}T${allTablesAtRestaurant.open_time}`);
        const afterOpeningTime =
          new Date(`${day}T${availability.time}`) <=
          new Date(`${day}T${allTablesAtRestaurant.close_time}`);
        return beforeOpeningTime && afterOpeningTime;
      });

    return res.status(200).json(availabilitySlots);
  }
  // return res.status(200).json({"times":filteredtime, "bookings": bookings, "bookingtablesObj": bookingtablesObj, "tables": tables, "searchTimesWithTables": searchTimesWithTables});
}
// http://localhost:3000/api/restaurant/vivaan-fine-indian-cusine-ottawa/availability?day=2023-05-27&partysize=4&time=14:00:00.000Z
