import { PrismaClient } from "@prisma/client";

const getBookings = async (checkinDate, bookingStatus) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      checkinDate: {
        contains: checkinDate,
      },

      bookingStatus: {
        contains: bookingStatus,
      },
    },
    //I added the include option to retrieve related user and property information when fetching bookings.
    include: {
      user: true,
      property: true,
    },
  });

  return bookings;
};

export default getBookings;
