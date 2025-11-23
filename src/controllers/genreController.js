import { createGenre, getAllGenres, getGenreById } from "../services/genreService.js";

export async function getGenresHandler(req, res){
    const allGenres = await getAllGenres();
    res.status(200).json(allGenres);
}

export async function getGenreByIdHandler(req, res){
    console.log(req.params, "\n\n********\n\n")
    const id = parseInt(req.params.id)
    const genre = await getGenreById(id);
    res.status(200).json(genre)
}

export async function createGenreHandler(req, res){
    const {name} = req.body
    const genreData = {}
    if(name) genreData.name = name;
    const newGenre = await createGenre(genreData);
    res.status(200).json(newGenre)
}

export async function updateGenreByIdHandler(req, res){
    
}

export async function deleteGenreByIdHandler(req, res){
    
}