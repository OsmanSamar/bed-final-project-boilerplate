import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.update({
    where: { id },
    data: updatedUser,
  });

  // Disconnect the Prisma client
  await prisma.$disconnect();

  return user.count > 0 ? id : null;
};

export default updateUserById;
