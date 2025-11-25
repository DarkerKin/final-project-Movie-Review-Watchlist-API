import { body, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { getWatchlistById } from '../services/watchlistService.js';

export const createWatchlistValidators = [
  body('userId')
    .exists().withMessage('userId is required')
    .bail()
    .isInt({ gt: 0 }).withMessage('userId must be a positive integer')
    .toInt(),
  body('movieId')
    .exists().withMessage('movieId is required')
    .bail()
    .isInt({ gt: 0 }).withMessage('movieId must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

export const updateWatchlistValidators = [
  body('movieId')
    .optional()
    .isInt({ gt: 0 }).withMessage('movieId must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

export const idParamValidator = [
  param('id')
    .exists().withMessage('id param is required')
    .bail()
    .isInt({ gt: 0 }).withMessage('id must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

export const getWatchlistsValidators = [
  query('userId')
    .optional()
    .isInt({ gt: 0 }).withMessage('userId must be a positive integer')
    .toInt(),
  query('movieId')
    .optional()
    .isInt({ gt: 0 }).withMessage('movieId must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

export async function checkIfUserWatchlist(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const watchlist = await getWatchlistById(id);

  if (!watchlist) {
    return res.status(404).json({ message: 'watchlist not found' });
  }

  if (watchlist.userId !== req.user.id) {
    return res.status(403).json({ message: 'forbidden' });
  }

  next();
}
