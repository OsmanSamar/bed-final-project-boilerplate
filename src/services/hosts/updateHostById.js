import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedHost) => {
  try {
    const prisma = new PrismaClient();

    // const { listings, ...rest } = updatedHost;

    const Host = await prisma.host.update({
      where: { id },
      // update: {},
      data:
        // id,
        // ...rest,
        // listings: {
        //   connect: listings.map((propertyId) => ({ id: propertyId })),
        // },
        updatedHost,
    });

    return Host;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updateHostById;
