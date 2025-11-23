import express from 'express';
import { getWatchlistsHandler, getWatchlistByIdHandler, createWatchlistHandler, updateWatchlistHandler, deleteWatchlistHandler, } from '../controllers/watchlistController.js';
import { createWatchlistValidators, updateWatchlistValidators, idParamValidator, getWatchlistsValidators, } from '../middleware/watchlistValidators.js';

const router = express.Router();

router.get('/', getWatchlistsValidators, getWatchlistsHandler);
router.get('/:id', idParamValidator, getWatchlistByIdHandler);
router.post('/', createWatchlistValidators, createWatchlistHandler);
router.put('/:id', updateWatchlistValidators, updateWatchlistHandler);
router.delete('/:id', idParamValidator, deleteWatchlistHandler);

export default router;