import express from 'express';
import { signUpHandler,loginHandler } from '../controllers/authController.js';
import {validateSignUpUser,validateLoginUser} from '../middleware/userValidators.js'
import loginIntLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup',loginIntLimiter,validateSignUpUser,signUpHandler);
router.post('/login',loginIntLimiter,validateLoginUser,loginHandler);

export default router;