import { createGenreInDB, deleteGenreByIdInDB, getAllGenresFromDB, getGenreByIdFromDB, updateGenreInDB } from "../repositories/genreRepo.js";


export async function getAllGenres(){
    return await getAllGenresFromDB();
}

export async function getGenreById(id){
    return await getGenreByIdFromDB(id)
}

export async function createGenre(genreData){
    return await createGenreInDB(genreData)
}

export async function updateGenre(id, genreData){
    const updatedGenre = await updateGenreInDB(id, genreData);
    if(updatedGenre){
        return updatedGenre;
    }else{
        const error = new Error(`cannot find genre with id ${id}`);
        error.code = 404;
        throw error;
    }
}

export async function deleteGenre(id){
    const deletedGenre = await deleteGenreByIdInDB(id);
    if(deleteGenre) return;
    else{
        const error = new Error(`cannot find genre with id ${id}`);
        error.code = 404;
        throw error;
    }
}