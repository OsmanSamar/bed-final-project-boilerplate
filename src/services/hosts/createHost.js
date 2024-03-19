import { PrismaClient } from "@prisma/client";

const createHost = async (host) => {
  const prisma = new PrismaClient();
  console.log("createHost function on line 5:", host);
  const createdHost = await prisma.host.create({
    // where: { id: host.id },
    // update: {},
    data: {
      // id: host.id,
      username: host.username,
      password: host.password,
      name: host.name,
      email: host.email,
      phoneNumber: host.phoneNumber,
      profilePicture: host.profilePicture,
      aboutMe: host.aboutMe,
      // listings: {
      //   connect: host.listings.map((propertyId) => ({ id: propertyId })),
      // },
    },
  });

  return createdHost;
};

export default createHost;
