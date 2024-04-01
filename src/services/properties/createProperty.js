import { PrismaClient } from "@prisma/client";

const createProperty = async (property) => {
  // Check if all required fields are provided
  if (
    !property.title ||
    !property.description ||
    !property.location ||
    !property.pricePerNight ||
    !property.bedroomCount ||
    !property.bathRoomCount ||
    !property.maxGuestCount ||
    !property.rating ||
    !property.hostId
  ) {
    throw new Error("All required fields must be provided.");
  }

  const prisma = new PrismaClient();

  console.log("createProperty function on line 5:", property);

  const createdProperty = await prisma.property.create({
    // where: { id: property.id },
    // update: {},
    data: {
      // id: property.id,
      title: property.title,
      description: property.description,
      location: property.location,
      pricePerNight: property.pricePerNight,
      bedroomCount: property.bedroomCount,
      bathRoomCount: property.bathRoomCount,
      maxGuestCount: property.maxGuestCount,
      rating: property.rating,

      // Connect to the host using the provided hostId

      host: {
        connect: { id: property.hostId },
      },

      // amenities: {
      //   connect: property.amenities.map((amenity) => ({ id: amenity.id })),
      // },

      // bookings: {
      //   connect: property.bookings.map((booking) => ({ id: booking.id })),
      // },

      // reviews: {
      //   connect: property.reviews.map((review) => ({ id: review.id })),
      // },
    },
  });

  return createdProperty;
};

export default createProperty;
