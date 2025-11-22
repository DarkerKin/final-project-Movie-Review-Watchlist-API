import express from 'express';
import {getReviewsHandler, getReviewByIdHandler, createReviewHandler, updateReviewHandler, deleteReviewHandler} from '../controllers/reviewController.js'

const router = express.Router();

router.get('/', getReviewsHandler);
router.get('/:id',  getReviewByIdHandler);
router.post('/', createReviewHandler);
router.put('/:id',  updateReviewHandler);
router.delete('/:id', deleteReviewHandler);

export default router;