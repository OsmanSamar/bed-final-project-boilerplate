import { PrismaClient } from "@prisma/client";

const createAmenity = async (amenity) => {
  const prisma = new PrismaClient();
  console.log("createAmenity function on line 5:", amenity);
  const createdAmenity = await prisma.amenity.create({
    // where: { id: amenity.id },
    // update: {},
    data: {
      // id: amenity.id,
      name: amenity.name,
    },
  });

  return createdAmenity;
};

export default createAmenity;
