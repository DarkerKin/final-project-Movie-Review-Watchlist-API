import { getAllWatchlistsFromDB, getWatchlistByIdFromDB, createWatchlistInDB, updateWatchlistInDB, deleteWatchlistInDB, } from '../repositories/watchlistRepo.js';

export async function getAllWatchlists(filter) {
  return await getAllWatchlistsFromDB(filter);
}

export async function getWatchlistById(id) {
  return await getWatchlistByIdFromDB(id);
}

export async function createWatchlist(payload) {
  return await createWatchlistInDB(payload);
}

export async function updateWatchlist(id, payload) {
  return await updateWatchlistInDB(id, payload);
}

export async function deleteWatchlist(id) {
  return await deleteWatchlistInDB(id);
}