import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const { hostId, amenities, bookings, reviews, ...rest } = updatedProperty;

  const updatedProperty = await prisma.property.upsert({
    where: { id },
    update: {},
    create: {
      id,
      ...rest,
      host: {
        connect: { id: hostId },
      },
      amenities: {
        connect: amenities.map((amenity) => ({ id: amenity.id })),
      },
      bookings: {
        connect: bookings.map((booking) => ({ id: booking.id })),
      },
      reviews: {
        connect: reviews.map((review) => ({ id: review.id })),
      },
    },
  });

  return updatedProperty;
};

export default updatePropertyById;
