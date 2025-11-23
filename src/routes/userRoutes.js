import express from "express";
import { deleteUserHandler, getUserReviewHandler, getUserWatchlistHandler, getAllUsersHandler,getUserHandler,updateUserHandler, updateUserRoleHandler } from "../controllers/userController.js";
import {authenticate} from "../middleware/authenticate.js"
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { checkForUnique, checkForUniqueId, validateUserId, validateUserUpdates } from "../middleware/userValidators.js";
const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler)

router.get('/me', authenticate, getUserHandler)

router.put('/me',authenticate,validateUserUpdates,checkForUnique,updateUserHandler)

router.delete('/me', authenticate, deleteUserHandler);

router.get('/me/review', authenticate,getUserReviewHandler)

router.get('/me/watchlist', authenticate,getUserWatchlistHandler)

router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'),validateUserId,checkForUniqueId,updateUserRoleHandler)

export default router;