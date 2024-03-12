import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const { userId, propertyId, ...rest } = updatedReview;

  const review = await prisma.review.update({
    where: { id },
    data: {
      ...rest,
      user: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      property: propertyId
        ? {
            connect: { id: propertyId },
          }
        : undefined,
    },
  });

  return review;
};

export default updateReviewById;
