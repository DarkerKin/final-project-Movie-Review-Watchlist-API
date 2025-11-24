import { checkForGenreId, checkForUniqueGenreName } from '../repositories/genreRepo.js';
import { handleValidationErrors } from './handleValidationErrors.js';
import { param, body } from 'express-validator';

export const validateGenreId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateGenre = [
    body('name')
    .exists({ values: 'falsy' })
    .withMessage("genre name is required")
    .bail()
    .isString()
    .withMessage("genre name must be a string")
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("genre name must be at least 3 characters")
    .bail()
    .custom(async (value) =>{
        if(value &&  !(await checkForUniqueGenreName(value))) 
            throw new Error(`genre with name: ${value} already exists`)
        return true
    }),
    handleValidationErrors
]

export async function checkForGenreIdInDB(req, res, next){
    const id = parseInt(req.params.id);
    const isGenreWithIdExists = await checkForGenreId(id);
    if(!isGenreWithIdExists){
        res.status(404).json({message:`genre with id ${id} does not exists`});
    }
    next();
}