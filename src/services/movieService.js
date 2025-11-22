import {getAllMoviesFromDB, getMovieByIdFromDB} from '../repositories/movieRepo.js'

export async function getAllMovies(){
    return await getAllMoviesFromDB();
}

export async function getMovieById(id){
    return await getMovieByIdFromDB(id);
}