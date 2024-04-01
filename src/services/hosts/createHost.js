import { PrismaClient } from "@prisma/client";

const createHost = async (host) => {
  const prisma = new PrismaClient();

  // Check if all required fields are provided
  if (
    !host.username ||
    !host.password ||
    !host.name ||
    !host.email ||
    !host.phoneNumber ||
    !host.profilePicture ||
    !host.aboutMe
  ) {
    throw new Error("All required fields must be provided.");
  }

  console.log("createHost function on line 3:", host);
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
