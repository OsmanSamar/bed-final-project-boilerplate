import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  try {
    const prisma = new PrismaClient();

    // const { userId, propertyId, ...rest } = updatedBooking;

    const booking = await prisma.booking.update({
      where: { id },

      // data: {
      //   ...rest,
      //   // userId and propertyId to connect directly to the related entities.
      //   user: userId
      //     ? {
      //         connect: { id: userId },
      //       }
      //     : undefined,
      //   property: propertyId
      //     ? {
      //         connect: { id: propertyId },
      //       }
      //     : undefined,
      // },
      data: updatedBooking,
    });

    return booking;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updateBookingById;
