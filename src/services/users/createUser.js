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
    username,
    name,
    password,
    email,
    phoneNumber,
    profilePicture,
  };

  // Check if all required fields are provided
  if (
    !username ||
    !name ||
    !password ||
    !email ||
    !phoneNumber ||
    !profilePicture
  ) {
    throw new Error("All required fields must be provided.");
  }

  // console.log("New user data:", newUser); // Log the new user data
  console.log("createUser function on line 11:", newUser);

  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.create({
      data: newUser,
    });

    console.log("Created user:", user); // Log the created user

    // Disconnect the Prisma client
    await prisma.$disconnect();
    //This ensures that the Prisma client is properly disconnected after the user creation operation,
    //which is good practice to avoid potential issues.

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;
