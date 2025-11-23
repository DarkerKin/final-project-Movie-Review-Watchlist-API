import { checkForGenreId } from '../repositories/genreRepo.js';
import { handleValidationErrors } from './handleValidationErrors.js';
import { param, body } from 'express-validator';

export const validateGenreId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer'),
  handleValidationErrors,
];

export async function checkForGenreIdInDB(req, res, next){
    const id = parseInt(req.params.id);
    const isGenreWithIdExists = await checkForGenreId(id);
    if(!isGenreWithIdExists){
        res.status(404).json({message:`genre with id ${id} does not exists`});
    }
    next();
}