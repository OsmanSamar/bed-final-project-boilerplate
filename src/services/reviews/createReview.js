import { PrismaClient } from "@prisma/client";

const createReview = async (rating, comment, userId, propertyId) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
    },
  });

  return review;
};

export default createReview;
