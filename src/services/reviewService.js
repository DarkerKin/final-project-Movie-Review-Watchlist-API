import prisma from '../config/db.js';

// GET ALL reviews with optional filters (movieId, userId)
export async function getAllReviewsFromDB(filter) {
  return await prisma.review.findMany({
    where: filter,
    include: {
      movie: true,
      user: true,
    },
  });
}

// GET one review
export async function getReviewByIdFromDB(id) {
  return await prisma.review.findUnique({
    where: { id },
    include: {
      movie: true,
      user: true,
    },
  });
}

// CREATE review
export async function createReviewInDB(data) {
  return await prisma.review.create({
    data,
  });
}

// UPDATE review
export async function updateReviewInDB(id, data) {
  return await prisma.review.update({
    where: { id },
    data,
  });
}

// DELETE review
export async function deleteReviewInDB(id) {
  return await prisma.review.delete({
    where: { id },
  });
}
