import {getAllMovies, getMovieById, createMovie,updateMovie, deleteMovie, getMovieReview} from '../services/movieService.js'

export async function getMoviesHandler(req, res){
    let allMovies = await getAllMovies();
    res.status(200).json(allMovies);
}

export async function getMovieByIdHandler(req,res){
    let id = parseInt(req.params.id)
    let movie = await getMovieById(id);
    res.status(200).json(movie)
}

export async function createMovieHandler(req, res) {
  const { title, releaseYear, description, genres } = req.body;

  const movieData = {};

  if (title) {
    movieData.title = title;
  }

  if (releaseYear) {
    movieData.releaseYear = releaseYear;
  }

  if (description) {
    movieData.description = description;
  }

  if (genres && Array.isArray(genres)) {
    movieData.genre = {
      connect: genres.map(id => ({ id: Number(id) }))
    };
  }

  const movie = await createMovie(movieData);
  console.log(movie)
  res.status(200).json(movie)
}

export async function updateMovieHandler(req,res){
  const movieId = parseInt(req.params.id)
  const { title, releaseYear, description, genres } = req.body;

  const movieData = {};

  if (title) {
    movieData.title = title;
  }

  if (releaseYear) {
    movieData.releaseYear = releaseYear;
  }

  if (description) {
    movieData.description = description;
  }

  if (genres && Array.isArray(genres)) {
    movieData.genre = {
      set: genres.map(id => ({ id: Number(id) }))
    };
  }

  const updatedMovie = await updateMovie(movieId,movieData);
  res.status(200).json(updatedMovie);
}

export async function deleteMovieHandler(req,res){
    let id = parseInt(req.params.id)
    await deleteMovie(id);
    res.status(204).send();
}

export async function getMovieReviewHandler(req, res) {
  let id = parseInt(req.params.id);
  let movieReview = await getMovieReview(id);
  res.status(200).json(movieReview);
}