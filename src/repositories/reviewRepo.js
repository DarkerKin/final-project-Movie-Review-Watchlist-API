import prisma from '../config/db.js';

export async function getReviewByUserID(userId) {
  return await prisma.review.findMany({
    where: { userId },
  });
}

export async function getAllReviewsFromDB(filter = {}) {
  // filter can contain { movieId, userId }
  const where = {};
  if (filter.movieId) where.movieId = filter.movieId;
  if (filter.userId) where.userId = filter.userId;

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return reviews;
}

export async function getReviewByIdFromDB(id) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return review;
}

export async function createReviewInDB(reviewData) {
  const review = await prisma.review.create({
    data: reviewData,
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return review;
}

export async function updateReviewInDB(id, reviewData) {
  const review = await prisma.review.update({
    where: { id },
    data: reviewData,
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return review;
}

export async function deleteReviewFromDB(id) {
  return await prisma.review.delete({
    where: { id },
  });
}

export async function getMovieReviewFromDB(movieId) {
  return await prisma.review.findMany({
    where: { movieId },
  });
}
