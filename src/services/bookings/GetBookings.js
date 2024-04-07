import { PrismaClient } from "@prisma/client";

const GetBookings = async (checkinDate, bookingStatus) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      checkinDate: {
        contains: checkinDate,
      },
      bookingStatus: {
        contains: bookingStatus,
      },
      property: {
        // Check if the property ID is not null
        id: {
          not: "",
        },
      },
    },
    include: {
      user: true,
      property: true,
    },
  });

  return bookings;
};

export default GetBookings;
