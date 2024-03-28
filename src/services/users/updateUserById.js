import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: { id },
      data: updatedUser,
    });

    // Disconnect the Prisma client
    // await prisma.$disconnect();

    return user; //.count > 0 ? id : null;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updateUserById;
