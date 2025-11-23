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
        data: genreData,
        select:{
            id: true,
            name: true
        }
    })
    return newGenre;
}

export async function updateGenreInDB(id,genreData){
    try{
        const updatedGenre = await prisma.genre.update({
        where:{id},
        data: genreData,
        select:{
            id: true,
            name: true
        }
        })
        return updatedGenre;
    }catch(err){
        if(err.code ==='P2025') return null;
    }
    
}

export async function deleteGenreByIdInDB(id){
    try{
        const deletedGenre = await prisma.genre.delete({
            where:{id},
        })
        return deletedGenre;

    }catch(err){
        if(err.code === 'P2025') return null;
    }
}

export async function checkForGenreId(id) {
    let count = await prisma.genre.count({
        where:{id}
    })
    return count > 0;
}


// return true if genre name is not there and false if it is there
export async function checkForUniqueGenreName(genreName){
    let count = await prisma.genre.count({
        where:{
            name:{
                equals: genreName,
                mode: 'insensitive'
            }
        },
    })
    return count === 0;
}