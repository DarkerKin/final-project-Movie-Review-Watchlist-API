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

export async function checkForMovieId(id){
    let count = await prisma.movie.count({
        where:{id}
    })
    return count > 0;
}