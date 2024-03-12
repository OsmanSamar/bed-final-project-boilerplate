import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  name,
  password,
  email,
  phoneNumber,
  profilePicture
) => {
  const newUser = {
    name,
    username,
    password,
    email,
    phoneNumber,
    profilePicture,
  };

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: newUser,
  });

  // Disconnect the Prisma client
  await prisma.$disconnect();
  //This ensures that the Prisma client is properly disconnected after the user creation operation,
  //which is good practice to avoid potential issues.

  return user;
};

export default createUser;
