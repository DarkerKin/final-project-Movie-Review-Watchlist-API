import prisma from "../config/db.js";

export async function getUserWatchlistFromDB(userId){
    return await prisma.watchlist.findMany({
        where:{userId}
    })
}

export async function getAllWatchlistsFromDB(filter = {}) {
  const where = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.movieId) where.movieId = filter.movieId;

  const items = await prisma.watchlist.findMany({
    where,
    orderBy: { addedAt: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return items;
}

export async function getWatchlistByIdFromDB(id) {
  const item = await prisma.watchlist.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return item;
}

export async function createWatchlistInDB(data) {
  // data: { userId, movieId }
  const created = await prisma.watchlist.create({
    data: {
      userId: data.userId,
      movieId: data.movieId,
    },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return created;
}

export async function updateWatchlistInDB(id, data) {
  const updated = await prisma.watchlist.update({
    where: { id },
    data: {
      userId: data.userId,
      movieId: data.movieId,
    },
    include: {
      user: { select: { id: true, username: true } },
      movie: { select: { id: true, title: true } },
    },
  });
  return updated;
}

export async function deleteWatchlistInDB(id) {
  await prisma.watchlist.delete({ where: { id } });
  return;
}