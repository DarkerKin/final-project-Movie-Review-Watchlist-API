import prisma from '../config/db.js'

export async function getAllMoviesFromDB(){
    const movies = await prisma.movie.findMany({
        select:{
            id: true,
            title: true,
            releaseYear: true,
            description: true,
            genre:{
                select:{
                    name: true
                }
            }
        }
    });
    return movies;
}

export async function getMovieByIdFromDB(id){
    const movie = await prisma.movie.findUnique({
        where:{id},
        select:{
            id: true,
            title: true,
            releaseYear: true,
            description: true,
            genre:{
                select:{
                    name: true
                }
            }
        }
    })
    return movie;
}

export async function createMovieInDB(movieData){
    const movie = await prisma.movie.create({
        data: movieData,
        include:{
            genre:true
        }
    })
    return movie
}

export async function updateMovieInDB(id, movieData){
    try{
        const updatedMovie = await prisma.movie.update({
            where:{id},
            data: movieData,
            include:{
                genre:true
            }
        })
        return updatedMovie
    }catch(err){
        if(err.code === 'P2025') return null;
    }
}

export async function deleteMovieFromDB(id){
    try{
        let deletedMovie = await prisma.movie.delete({
        where:{
            id
        }
        })
        return deletedMovie;
    }catch(err){
        if(err.code === 'P2025') return null
    }
}

export async function checkForMovieId(id){
    let count = await prisma.movie.count({
        where:{id}
    })
    return count > 0;
}