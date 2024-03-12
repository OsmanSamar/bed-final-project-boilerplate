import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const deletedHost = await prisma.host.deleteMany({
    where: { id },
  });

  return deletedHost.count > 0 ? id : null;
};

export default deleteHostById;
