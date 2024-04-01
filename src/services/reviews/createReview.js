import { PrismaClient } from "@prisma/client";

const createReview = async (rating, comment, userId, propertyId) => {
  //rating, comment, userId, propertyId

  // Check if all required fields are provided
  if (!rating || !comment || !userId || !propertyId) {
    throw new Error("All required fields must be provided.");
  }

  const newReview = {
    rating,
    comment,
    userId,
    propertyId,
  };
  const prisma = new PrismaClient();

  console.log("createReview function on line 6:", newReview);

  const createdReview = await prisma.review.create({
    data: newReview,
    // rating: review.rating,
    //comment: review.comment,
    // user: {
    //   connect: { id: review.userId },
    //  },
    // property: {
    //    connect: { id: review.propertyId },
    //  },
  });

  return createdReview;
};

export default createReview;
