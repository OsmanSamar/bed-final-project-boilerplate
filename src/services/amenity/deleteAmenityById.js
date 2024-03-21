import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const deletedAmenity = await prisma.amenity.delete({
    where: { id },
  });

  return deletedAmenity.count > 0 ? id : null;
};

export default deleteAmenityById;
