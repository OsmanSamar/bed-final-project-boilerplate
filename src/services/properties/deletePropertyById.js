import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const deletedProperty = await prisma.property.deleteMany({
    where: { id },
  });

  return deletedProperty.count > 0 ? id : null;
};

export default deletePropertyById;
