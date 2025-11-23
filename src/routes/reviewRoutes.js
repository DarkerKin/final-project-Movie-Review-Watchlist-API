import express from 'express';
import { getReviewsHandler, getReviewByIdHandler, createReviewHandler, updateReviewHandler, deleteReviewHandler } from '../controllers/reviewController.js';
import { createReviewValidators, updateReviewValidators, reviewIdValidator, getReviewsValidators } from '../middleware/reviewValidators.js';

const router = express.Router();

router.get('/', getReviewsValidators, getReviewsHandler);
router.get('/:id', reviewIdValidator, getReviewByIdHandler);
router.post('/', createReviewValidators, createReviewHandler);
router.put('/:id', updateReviewValidators, updateReviewHandler);
router.delete('/:id', reviewIdValidator, deleteReviewHandler);

export default router;