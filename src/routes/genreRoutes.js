import express from 'express';
import { getGenresHandler, getGenreByIdHandler, createGenreHandler,updateGenreByIdHandler, deleteGenreByIdHandler} from '../controllers/genreController.js'

const router = express.Router();

router.get('/', getGenresHandler);
router.get('/:id',  getGenreByIdHandler);
router.post('/', createGenreHandler);
router.put('/:id',  updateGenreByIdHandler);
router.delete('/:id',  deleteGenreByIdHandler);

export default router;