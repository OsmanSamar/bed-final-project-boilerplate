import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.upsert({
    where: { id },
    update: {},
    create: {
      id,
      ...updatedAmenity,
    },
  });

  return amenity;
};

export default updateAmenityById;
