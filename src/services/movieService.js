import {getAllMoviesFromDB, getMovieByIdFromDB,createMovieInDB,updateMovieInDB, deleteMovieFromDB} from '../repositories/movieRepo.js'

export async function getAllMovies(){
    return await getAllMoviesFromDB();
}

export async function getMovieById(id){
    return await getMovieByIdFromDB(id);
}
export async function createMovie(movieData){
    return await createMovieInDB(movieData);
}

export async function updateMovie(id, movieData){
    const updatedMovie = await updateMovieInDB(id,movieData);
    if(updatedMovie){
        return updatedMovie;
    }else{
        const error = new Error(`cannot find movie with id ${id}`);
        error.status = 404;
        throw error;
    }
}


export async function deleteMovie(id){
    const deletedMovie = await deleteMovieFromDB(id);
    if(deleteMovie){
        return;
    }else{
        const error = new Error(`cannot find movie with id ${id}`);
        error.status = 404;
        throw error;
    }
}