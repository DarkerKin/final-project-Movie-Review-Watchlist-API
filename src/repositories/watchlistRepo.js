import prisma from "../config/db.js";

export async function getUserWatchlistFromDB(userId){
    return await prisma.watchlist.findMany({
        where:{userId}
    })
}