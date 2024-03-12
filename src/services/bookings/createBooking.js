import { PrismaClient } from "@prisma/client";

const createBooking = async (
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
  userId,
  propertyId
) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.create({
    data: {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
      userId: {
        connect: { id: userId },
      },

      //property is a single relation
      property: {
        connect: { id: propertyId },
      },
      // property: {
      //   connect: propertyId.map((id) => ({ id })),
      // },
    },
  });

  return booking;
};

export default createBooking;
