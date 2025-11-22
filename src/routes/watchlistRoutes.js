import express from 'express';

const router = express.Router();

router.get('/', getWatchlistsHandler);
router.get('/:id', getWatchlistByIdHandler);
router.post('/', createWatchlistHandler);
router.put('/:id', updateWatchlistHandler);
router.delete('/:id', deleteWatchlistHandler);

export default router;