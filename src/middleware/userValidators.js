import { findUserByEmail, findUserById } from "../repositories/userRepo.js";
import { handleValidationErrors } from "./handleValidationErrors.js";
import  {body,oneOf, param} from 'express-validator';

export const validateLoginUser = [
    body('email')
    .exists({values:'false'})
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

    body('password')
    .exists({values:'false'})
    .withMessage('password is required')
    .bail()
    .isLength({min:8, max:64})
    .withMessage('password must contain at least 8 character and at most 64 characters'),
    handleValidationErrors
]

export const validateSignUpUser = [
    body('username')
    .exists({ values: 'falsy' })
    .withMessage("username is required")
    .bail()
    .isString()
    .withMessage("username must be a string")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters"),

    body('email')
    .exists({values:'false'})
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

    body('password')
    .exists({values:'false'})
    .withMessage('password is required')
    .bail()
    .isLength({min:8, max:64})
    .withMessage('password must contain at least 8 character and at most 64 characters'),
    handleValidationErrors
]

export const validateUserUpdates = [
    oneOf(
        [
          body('email').exists({ values: 'falsy' }),
          body('password').exists({ values: 'falsy' }),
          body('username').exists({ values: 'falsy' })
        ],
        {
          message:
            'At least one field (password, email) must be provided',
        },
      ),
    body('email')
    .optional()
    .isEmail()
    .withMessage('email is not valid')
    .bail()
    .normalizeEmail(),
      body('password')
    .optional()
    .isLength({min:8, max:64})
    .withMessage('password must contain at least 8 character and at most 64 characters'),
    
      handleValidationErrors
]

export const validateUserId = [
  param("id")
  .isInt({min:1})
  .withMessage("id should be an integer"),
  body("role")
  .isIn(["user","admin","ADMIN","USER"])
  .withMessage("user role should be either admin or user"),
  handleValidationErrors
]

export async function checkForUnique(req, res, next) {
  if(req.body.email){
    const checkForUniqueEmail = await findUserByEmail(req.body.email);
    if(checkForUniqueEmail) res.status(409).json({error:'email already exists'});
  }
  next();
}

export async function checkForUniqueId(req,res,next){  
  const userId = parseInt(req.params.id);

  const checkId = await findUserById(userId);
  if(!checkId) res.status(404).json({message:"user not found"});
  next();
}