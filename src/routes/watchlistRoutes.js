import express from 'express';
import { getWatchlistsHandler, getWatchlistByIdHandler, createWatchlistHandler, updateWatchlistHandler, deleteWatchlistHandler, } from '../controllers/watchlistController.js';
<<<<<<< HEAD
import { createWatchlistValidators, updateWatchlistValidators, idParamValidator, getWatchlistsValidators, } from '../middleware/watchlistValidators.js';

const router = express.Router();

router.get('/', getWatchlistsValidators, getWatchlistsHandler);
router.get('/:id', idParamValidator, getWatchlistByIdHandler);
router.post('/', createWatchlistValidators, createWatchlistHandler);
router.put('/:id', updateWatchlistValidators, updateWatchlistHandler);
router.delete('/:id', idParamValidator, deleteWatchlistHandler);
=======
import { createWatchlistValidators, updateWatchlistValidators, idParamValidator, getWatchlistsValidators, checkIfUserWatchlist, } from '../middleware/watchlistValidators.js';
import {authenticate} from "../middleware/authenticate.js"
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getWatchlistsValidators, getWatchlistsHandler);
router.get('/:id', authenticate, idParamValidator, getWatchlistByIdHandler);
router.post('/', authenticate, createWatchlistValidators, createWatchlistHandler);
router.put('/:id', authenticate, updateWatchlistValidators, checkIfUserWatchlist, updateWatchlistHandler);
router.delete('/:id', authenticate, idParamValidator, checkIfUserWatchlist, deleteWatchlistHandler);
>>>>>>> origin/main

export default router;