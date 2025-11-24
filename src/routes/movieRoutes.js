import express from 'express';
import {getMoviesHandler, getMovieByIdHandler,createMovieHandler,updateMovieHandler,deleteMovieHandler, getMovieReviewHandler} from '../controllers/movieController.js'
import { checkIfMovieWithIdExist, validateCreateMovie, validateMovieId, validateUpdateMovie } from '../middleware/moviesValidators.js';
import {authenticate} from "../middleware/authenticate.js"
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get('/', authenticate, getMoviesHandler);
router.get('/:id', authenticate, validateMovieId, checkIfMovieWithIdExist, getMovieByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), validateCreateMovie, createMovieHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateMovieId, checkIfMovieWithIdExist, validateUpdateMovie, updateMovieHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateMovieId, checkIfMovieWithIdExist, deleteMovieHandler);
router.get('/:id/reviews', authenticate,validateMovieId,getMovieReviewHandler);
export default router;