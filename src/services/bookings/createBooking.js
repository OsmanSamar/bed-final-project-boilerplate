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
  //const prisma = new PrismaClient();
  // const booking = await prisma.booking.create({
  //   data: {
  //     checkinDate,
  //     checkoutDate,
  //     numberOfGuests,
  //     totalPrice,
  //     bookingStatus,
  //     user: {
  //       connect: { id: userId },
  //     },

  //     //property is a single relation
  //     property: {
  //       connect: { id: propertyId },
  //     },
  //     // property: {
  //     //   connect: propertyId.map((id) => ({ id })),
  //     // },
  //   },
  // });

  // Create a new booking object
  const newBooking = {
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
    userId,
    propertyId,
  };

  // Initialize PrismaClient
  const prisma = new PrismaClient();
  console.log(
    "createBooking function on line 3:",
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
    userId,
    propertyId
  );
  const booking = await prisma.booking.create({
    data: newBooking,
  });

  return booking;
};

export default createBooking;
