import express from 'express';
import { getGenresHandler, getGenreByIdHandler, createGenreHandler,updateGenreByIdHandler, deleteGenreByIdHandler} from '../controllers/genreController.js'
import { checkForGenreIdInDB, validateCreateGenre, validateGenreId } from '../middleware/genreValidators.js';
import {authenticate} from "../middleware/authenticate.js"
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get('/', authenticate, getGenresHandler);
router.get('/:id', authenticate, validateGenreId, checkForGenreIdInDB,  getGenreByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), validateCreateGenre, createGenreHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateGenreId, checkForGenreIdInDB,  updateGenreByIdHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateGenreId, checkForGenreIdInDB,  deleteGenreByIdHandler);

export default router;