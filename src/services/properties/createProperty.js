import { PrismaClient } from "@prisma/client";

const createProperty = async (property) => {
  const prisma = new PrismaClient();
  console.log("createProperty function on line 5:", property);

  // To check if property.hostId is defined before proceeding
  // if (!property.hostId) {
  //   throw new Error("Property host ID is undefined");
  // }

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
