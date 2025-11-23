import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { checkForMovieId } from '../repositories/movieRepo.js';
import { checkForGenreId } from '../repositories/genreRepo.js';

export const validateMovieId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateMovie = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage("movie title is required")
    .bail()
    .isString()
    .withMessage("movie title must be a string")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("movie title must be at least 3 characters"),

  body('releaseYear')
    .exists({ values: 'falsy' })
    .withMessage("movie release year is required")
    .bail()
    .isInt({ min: 1884, max: 2050 })
    .withMessage("release year should be between 1884 and 2050"),

  body('description')
    .optional()
    .isString()
    .withMessage("movie description must be a string")
    .bail()
    .trim()
    .escape(),

  body('genres')
    .isArray({ min: 1 })
    .withMessage("genres must be a non empty array"),

  body('genres.*')
    .isInt({ min: 1 })
    .withMessage("each genre id must be a positive integer")
    .bail()
    .custom(async (value) => {
      const exists = await checkForGenreId(value);
      if (!exists) {
        throw new Error(`genre with id ${value} does not exist`);
      }
      return true;
    }),

  handleValidationErrors
];

export const validateUpdateMovie = [
  body('title')
    .optional()
    .isString()
    .withMessage("movie title must be a string")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("movie title must be at least 3 characters"),

  body('releaseYear')
    .optional()
    .isInt({ min: 1884, max: 2050 })
    .withMessage("release year should be between 1884 and 2050"),

  body('description')
    .optional()
    .isString()
    .withMessage("movie description must be a string")
    .bail()
    .trim()
    .escape(),

  body('genres')
    .optional()
    .isArray({ min: 1 })
    .withMessage("genres must be a non empty array"),

  body('genres.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage("each genre id must be a positive integer")
    .bail()
    .custom(async (value) => {
      const exists = await checkForGenreId(value);
      if (!exists) {
        throw new Error(`genre with id ${value} does not exist`);
      }
      return true;
    }),

  handleValidationErrors
];



export async function checkIfMovieWithIdExist(req, res, next) {
    const id = parseInt(req.params.id);
    const movieWithIdExists = await checkForMovieId(id);
    if (!movieWithIdExists) {
        return res.status(404).json({ message: "Movie not found" });
    }
    next();
}