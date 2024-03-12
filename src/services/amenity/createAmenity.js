import { PrismaClient } from "@prisma/client";

const createAmenity = async (amenity) => {
  const prisma = new PrismaClient();

  const createdAmenity = await prisma.amenity.upsert({
    where: { id: amenity.id },
    update: {},
    create: {
      id: amenity.id,
      name: amenity.name,
    },
  });

  return createdAmenity;
};

export default createAmenity;
