import { PrismaClient } from "@prisma/client";
import amenitieData from "../src/data/amenities.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { amenities } = amenitieData;
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertiesData;
  const { reviews } = reviewData;
  const { users } = userData;

  //Create users

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  //Create bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        // propertyId: booking.propertyId,
        checkinDate: new Date(booking.checkinDate), // Parse date string to Date object
        checkoutDate: new Date(booking.checkoutDate),
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,

        // Connect to user
        user: {
          connect: { id: booking.userId },
        },

        // Connect to property
        property: {
          connect: { id: booking.propertyId },
        },
      },
    });
  }

  //Create reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},

      create: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,

        // Connect to user
        user: {
          connect: { id: review.userId },
        },

        // Connect to property
        property: {
          connect: { id: review.propertyId },
        },
      },
    });
  }

  //Create properties
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,

        // Connect to host
        host: {
          connect: { id: property.hostId },
        },

        // Connect to amenities
        amenities: {
          connect: property.amenities.map((amenity) => ({ id: amenity.id })),
        },

        // many-to-many
        // Connect to bookings
        // bookings: {
        //   connect: { id: property.id },
        // },

        bookings: {
          connect: { id: property.bookings.map((booking) => booking.id) },
        },

        // Connect to reviews
        reviews: {
          connect: property.reviews.map((review) => ({ id: review.id })),
        },
      },
    });
  }

  //Create hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        pictureUrl: host.pictureUrl,
        aboutMe: host.aboutMe,
        listings: {
          connect: host.listings.map((propertyId) => ({ id: propertyId })),
        },
      },
    });
  }

  //Create amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: {
        id: amenity.id,
        name: amenity.name,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
