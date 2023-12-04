
import { times } from "../../../../data";
import { PrismaClient, Restaurant, Table } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function findAvailableTables({
  time,
  day,
  res,
  allTablesAtRestaurant
}: {
  time: string;
  day: string;
  res:NextApiResponse;
  allTablesAtRestaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
} 
}) {

    // if 7pm is selected bring time slots from 6pm to 8pm to display
  const filteredtime = times.find((t) => {
    return t.time === time.toUpperCase();
  })?.searchTimes; //?? [{displayTime:"undefined", time:"undefined", searchTimes:["undefined"]}];
  if (filteredtime === undefined) {
    return res
      .status(400)
      .json({ errorMessage: "Invalid request filteredtime" });
  }

  //bring all the reserved bookings between 6pm and 8pm
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${filteredtime[0]}`),
        lte: new Date(`${day}T${filteredtime[filteredtime.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  let bookingtablesObj: { [key: string]: { [key: number]: true } } = {};

  //for each time slot get the table_id that have already been booked 
  bookings.forEach((booking) => {
    bookingtablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return { ...obj, [table.table_id]: true };
      }, {});
  });

  //get all tables for the given time at the restaurant
  const tables = allTablesAtRestaurant.tables;
  const searchTimesWithTables = filteredtime.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  //for every available time in the time slot check if the table is available. we are doing this in 
  // a complicated way because even though a table can seat 4 people, for a party of 6 ppl 2 tables can be joined to accomodate. This we do in next step
  searchTimesWithTables.forEach((searchTime) => {
    searchTime.tables = searchTime.tables.filter((t) => {
      if (bookingtablesObj[searchTime.date.toISOString()] !== undefined) {
        if (
          bookingtablesObj[searchTime.date.toISOString()][t.id] !== undefined
        ) {
          console.log(bookingtablesObj[searchTime.date.toISOString()][t.id]);
          return false;
        }
      }
      return true;
    });
  });
  return searchTimesWithTables;
}