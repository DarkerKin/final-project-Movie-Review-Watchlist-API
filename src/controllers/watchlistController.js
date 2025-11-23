import { getAllWatchlists, getWatchlistById, createWatchlist, updateWatchlist, deleteWatchlist, } from '../services/watchlistService.js';

export async function getWatchlistsHandler(req, res) {
  try {
    const userId = req.query.userId ? parseInt(req.query.userId, 10) : undefined;
    const movieId = req.query.movieId ? parseInt(req.query.movieId, 10) : undefined;
    const filter = {};
    if (userId) filter.userId = userId;
    if (movieId) filter.movieId = movieId;

    const { getAllWatchlists } = await import('../services/watchlistService.js');
    const items = await getAllWatchlists(filter);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch watchlists' });
  }
}

export async function getWatchlistByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { getWatchlistById } = await import('../services/watchlistService.js');
    const item = await getWatchlistById(id);
    if (!item) return res.status(404).json({ message: 'Watchlist item not found' });
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch watchlist item' });
  }
}

export async function createWatchlistHandler(req, res) {
  try {
    const { userId, movieId } = req.body;
    if (!userId || !movieId) {
      return res.status(400).json({ message: 'userId and movieId are required' });
    }
    const { createWatchlist } = await import('../services/watchlistService.js');
    const created = await createWatchlist({ userId, movieId });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create watchlist item' });
  }
}

export async function updateWatchlistHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { userId, movieId } = req.body;
    if (!userId && !movieId) {
      return res.status(400).json({ message: 'Provide userId or movieId to update' });
    }
    const { updateWatchlist } = await import('../services/watchlistService.js');
    const updated = await updateWatchlist(id, { userId, movieId });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }
    res.status(500).json({ message: 'Failed to update watchlist item' });
  }
}

export async function deleteWatchlistHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { deleteWatchlist } = await import('../services/watchlistService.js');
    await deleteWatchlist(id);
    res.status(200).json({ message: 'Watchlist item deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }
    res.status(500).json({ message: 'Failed to delete watchlist item' });
  }
}