import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  try {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.update({
      where: { id },
      // update: {},
      // create: {
      //   id,
      //   ...updatedAmenity,
      // },
      data: updatedAmenity,
    });

    return amenity;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updateAmenityById;
