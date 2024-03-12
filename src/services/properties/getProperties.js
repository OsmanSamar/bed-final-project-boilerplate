import { PrismaClient } from "@prisma/client";

const getProperties = async ({ location, pricePerNight, amenities }) => {
  const prisma = new PrismaClient();

  const properties = await prisma.property.findMany({
    where: {
      location: location ? { contains: location } : undefined,
      pricePerNight: pricePerNight
        ? { equals: parseFloat(pricePerNight) }
        : undefined,
      amenities: amenities ? { some: { name: amenities } } : undefined,
    },
  });

  return properties;
};

export default getProperties;
