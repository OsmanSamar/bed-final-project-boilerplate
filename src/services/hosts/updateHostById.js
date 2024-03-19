import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedHost) => {
  const prisma = new PrismaClient();

  // const { listings, ...rest } = updatedHost;

  const Host = await prisma.host.updateMany({
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
};

export default updateHostById;
