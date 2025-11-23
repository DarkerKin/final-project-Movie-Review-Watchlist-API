import { createGenreInDB, getAllGenresFromDB, getGenreByIdFromDB } from "../repositories/genreRepo.js";


export async function getAllGenres(){
    return await getAllGenresFromDB();
}

export async function getGenreById(id){
    return await getGenreByIdFromDB(id)
}

export async function createGenre(genreData){
    return await createGenreInDB(genreData)
}