import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedHost) => {
  const prisma = new PrismaClient();

  const { listings, ...rest } = updatedHost;

  const updatedHost = await prisma.host.upsert({
    where: { id },
    update: {},
    create: {
      id,
      ...rest,
      listings: {
        connect: listings.map((propertyId) => ({ id: propertyId })),
      },
    },
  });

  return updatedHost;
};

export default updateHostById;
