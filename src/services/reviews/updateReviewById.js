import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  try {
    const prisma = new PrismaClient();

    // const { userId, propertyId, ...rest } = updatedReview;

    const review = await prisma.review.update({
      where: { id },
      data:
        // ...rest,
        // user: userId
        //   ? {
        //       connect: { id: userId },
        //     }
        //   : undefined,
        // property: propertyId
        //   ? {
        //       connect: { id: propertyId },
        //     }
        //   : undefined,
        updatedReview,
    });

    return review;
  } catch (error) {
    if (error.code === "P2025") {
      // Record to update not found
      return null;
    }
    // Handle other errors
    throw error;
  }
};

export default updateReviewById;
