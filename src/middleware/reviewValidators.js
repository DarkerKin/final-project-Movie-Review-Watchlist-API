import { body, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
<<<<<<< HEAD
=======
import { getReviewByIdFromDB } from '../repositories/reviewRepo.js';
>>>>>>> origin/main

export const createReviewValidators = [
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
  body('rating')
    .exists().withMessage('rating is required')
    .bail()
    .isInt({ min: 1, max: 5 }).withMessage('rating must be an integer between 1 and 5')
    .toInt(),
  body('comment')
    .optional()
    .isString().withMessage('comment must be a string')
    .trim()
    .isLength({ max: 200 }).withMessage('comment must be at most 200 characters'),
  handleValidationErrors,
];
export const updateReviewValidators = [
  param('id')
    .exists().withMessage('id param is required')
    .bail()
    .isInt({ gt: 0 }).withMessage('id must be a positive integer')
    .toInt(),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('rating must be an integer between 1 and 5')
    .toInt(),
  body('comment')
    .optional()
    .isString().withMessage('comment must be a string')
    .trim()
    .isLength({ max: 200 }).withMessage('comment must be at most 200 characters'),
  handleValidationErrors,
];
export const reviewIdValidator = [
  param('id')
    .exists().withMessage('id param is required')
    .bail()
    .isInt({ gt: 0 }).withMessage('id must be a positive integer')
    .toInt(),
  handleValidationErrors,
];
export const getReviewsValidators = [
  query('movieId')
    .optional()
    .isInt({ gt: 0 }).withMessage('movieId must be a positive integer')
    .toInt(),
<<<<<<< HEAD
  query('userId')
    .optional()
    .isInt({ gt: 0 }).withMessage('userId must be a positive integer')
    .toInt(),
  handleValidationErrors,
];
=======
  handleValidationErrors,
];

export async function checkIfUserTypedTheReview(req,res,next){
  let id = parseInt(req.params.id);
  let review = await getReviewByIdFromDB(id);
  if (!review) {
    return res.status(404).json({ message: 'review not found' });
  }
  
   if (review.userId !== req.user.id) {
    return res.status(403).json({ message: 'forbidden' });
  }
  next();
}
>>>>>>> origin/main
