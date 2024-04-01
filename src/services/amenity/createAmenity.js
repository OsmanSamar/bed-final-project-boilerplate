import { PrismaClient } from "@prisma/client";

const createAmenity = async ({ name }) => {
  // Check if the name field is provided
  if (!name) {
    throw new Error("The 'name' field is required.");
  }

  const prisma = new PrismaClient();

  //console.log("createAmenity function on line 5:", amenity);
  const amenity = await prisma.amenity.create({
    data: {
      name: name,
    },
  });

  return amenity;
};

export default createAmenity;
