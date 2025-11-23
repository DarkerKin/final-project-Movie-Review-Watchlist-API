import prisma from "../config/db.js";

export async function getAllGenresFromDB(){
    return await prisma.genre.findMany({
        select:{
            id: true,
            name:true
        }
    });
}

export async function getGenreByIdFromDB(id){
    return await prisma.genre.findUnique({
        where:{id},
        select:{
            id: true,
            name:true
        }
    });
}

export async function createGenreInDB(genreData){
    const newGenre = await prisma.genre.create({
        data: genreData
    })
    return newGenre;
}

export async function checkForGenreId(id) {
    let count = await prisma.genre.count({
        where:{id}
    })
    return count > 0;
}