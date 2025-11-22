import {getAllMovies, getMovieById} from '../services/movieService.js'

export async function getMoviesHandler(req, res){
    let allMovies = await getAllMovies();
    res.status(200).json(allMovies);
}

export async function getMovieByIdHandler(req,res){
    let id = parseInt(req.params.id)
    let movie = await getMovieById(id);
    res.status(200).json(movie)
}

export async function createMovieHandler(req,res){

}

export async function updateMovieHandler(req,res){

}

export async function deleteMovieHandler(req,res){
    
}