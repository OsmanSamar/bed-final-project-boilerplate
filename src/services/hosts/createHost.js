import { PrismaClient } from "@prisma/client";

const createHost = async (host) => {
  const prisma = new PrismaClient();

  const createdHost = await prisma.host.upsert({
    where: { id: host.id },
    update: {},
    create: {
      id: host.id,
      username: host.username,
      password: host.password,
      name: host.name,
      email: host.email,
      phoneNumber: host.phoneNumber,
      pictureUrl: host.pictureUrl,
      aboutMe: host.aboutMe,
      listings: {
        connect: host.listings.map((propertyId) => ({ id: propertyId })),
      },
    },
  });

  return createdHost;
};

export default createHost;
