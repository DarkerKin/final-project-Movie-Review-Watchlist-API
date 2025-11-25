import prisma from '../config/db.js';

<<<<<<< HEAD
export async function getAllReviewsFromDB(filter = {}) {
  // This can contain {movieId, userId}
  const where = {};
  if (filter.movieId) where.movieId = filter.movieId;
  if (filter.userId) where.userId = filter.userId;
=======
export async function getReviewByUserID(userId){
    return await prisma.review.findMany({
        where:{userId}
    })
}

export async function getAllReviewsFromDB(filter = {}) {
  // This can contain {movieId}
  const where = {};
  if (filter.movieId) where.movieId = filter.movieId;
>>>>>>> origin/main

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

export async function createReviewInDB(data) {
  // The data format is: { userId, movieId, rating, comment }
  const created = await prisma.review.create({
    data: {
      userId: data.userId,
      movieId: data.movieId,
      rating: data.rating,
      comment: data.comment ?? null,
    },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return created;
}

export async function updateReviewInDB(id, data) {
  const updated = await prisma.review.update({
    where: { id },
    data: {
      rating: data.rating,
      comment: data.comment ?? null,
    },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return updated;
}

export async function deleteReviewInDB(id) {
  await prisma.review.delete({ where: { id } });
  return;
}

<<<<<<< HEAD
export async function getReviewByUserID(userId) {
  return await prisma.review.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
}
=======
export async function getMovieReviewFromDB(movieId) {
    const movieReview = prisma.review.findMany({
        where:{
           movieId 
        }
    })
    return movieReview;
} 
>>>>>>> origin/main
