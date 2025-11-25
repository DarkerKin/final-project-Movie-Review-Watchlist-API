import express from 'express';
import { getReviewsHandler, getReviewByIdHandler, createReviewHandler, updateReviewHandler, deleteReviewHandler } from '../controllers/reviewController.js';
<<<<<<< HEAD
import { createReviewValidators, updateReviewValidators, reviewIdValidator, getReviewsValidators } from '../middleware/reviewValidators.js';

const router = express.Router();

router.get('/', getReviewsValidators, getReviewsHandler);
router.get('/:id', reviewIdValidator, getReviewByIdHandler);
router.post('/', createReviewValidators, createReviewHandler);
router.put('/:id', updateReviewValidators, updateReviewHandler);
router.delete('/:id', reviewIdValidator, deleteReviewHandler);
=======
import { createReviewValidators, updateReviewValidators, reviewIdValidator, getReviewsValidators, checkIfUserTypedTheReview } from '../middleware/reviewValidators.js';
import {authenticate} from "../middleware/authenticate.js"
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getReviewsValidators, getReviewsHandler);
router.get('/:id', authenticate, reviewIdValidator, getReviewByIdHandler);
router.post('/', authenticate, createReviewValidators, createReviewHandler);
router.put('/:id', authenticate, updateReviewValidators, checkIfUserTypedTheReview, updateReviewHandler);
router.delete('/:id', authenticate, reviewIdValidator, checkIfUserTypedTheReview, deleteReviewHandler);
>>>>>>> origin/main

export default router;