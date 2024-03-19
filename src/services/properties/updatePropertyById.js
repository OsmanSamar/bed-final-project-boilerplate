import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
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
  const Property = await prisma.property.update({
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

  return Property;
};

export default updatePropertyById;
