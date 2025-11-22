import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { checkForMovieId } from '../repositories/movieRepo.js';

export const validatePostId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer'),
  handleValidationErrors,
];

export async function checkIfMovieWithIdExist(req, res, next) {
    const id = parseInt(req.params.id);
    const movieWithIdExists = await checkForMovieId(id);
    if (!movieWithIdExists) {
        return res.status(404).json({ message: "Movie not found" });
    }
    next();
}