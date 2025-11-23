import express from 'express';
import {getMoviesHandler, getMovieByIdHandler,createMovieHandler,updateMovieHandler,deleteMovieHandler} from '../controllers/movieController.js'
import { checkIfMovieWithIdExist, validateCreateMovie, validateMovieId, validateUpdateMovie } from '../middleware/moviesValidators.js';

const router = express.Router();

router.get('/', getMoviesHandler);
router.get('/:id', validateMovieId, checkIfMovieWithIdExist, getMovieByIdHandler);
router.post('/',validateCreateMovie, createMovieHandler);
router.put('/:id', validateMovieId, checkIfMovieWithIdExist, validateUpdateMovie, updateMovieHandler);
router.delete('/:id', validateMovieId, checkIfMovieWithIdExist, deleteMovieHandler);

export default router;