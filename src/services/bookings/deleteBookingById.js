import { PrismaClient } from "@prisma/client";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.delete({
    where: { id },
  });
  console.log("createReview function on line 6:", booking);

  return booking.count > 0 ? id : null;
};

export default deleteBookingById;
