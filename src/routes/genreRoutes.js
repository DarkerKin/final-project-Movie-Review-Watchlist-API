import express from 'express';
import { getGenresHandler, getGenreByIdHandler, createGenreHandler,updateGenreByIdHandler, deleteGenreByIdHandler} from '../controllers/genreController.js'
import { checkForGenreIdInDB, validateGenreId } from '../middleware/genreValidators.js';

const router = express.Router();

router.get('/', getGenresHandler);
router.get('/:id', validateGenreId, checkForGenreIdInDB,  getGenreByIdHandler);
router.post('/', createGenreHandler);
router.put('/:id', validateGenreId, checkForGenreIdInDB,  updateGenreByIdHandler);
router.delete('/:id', validateGenreId, checkForGenreIdInDB,  deleteGenreByIdHandler);

export default router;