import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  try {
    const prisma = new PrismaClient();

    // const { hostId, amenities, bookings, reviews, ...rest } = updatedProperty;

    // const Property = await prisma.property.upsert({
    //   where: { id },
    //   update: {},
    //   create: {
    //     id,
    //     ...rest,
    //     host: {
    //       connect: { id: hostId },
    //     },
    //     amenities: {
    //       connect: amenities.map((amenity) => ({ id: amenity.id })),
    //     },
    //     bookings: {
    //       connect: bookings.map((booking) => ({ id: booking.id })),
    //     },
    //     reviews: {
    //       connect: reviews.map((review) => ({ id: review.id })),
    //     },
    //   },
    //});
    const property = await prisma.property.update({
      where: { id },
      // update: {},
      data:
        // id,
        // ...rest,
        // listings: {
        //   connect: listings.map((propertyId) => ({ id: propertyId })),
        // },
        updatedProperty,
    });

    return property;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updatePropertyById;
