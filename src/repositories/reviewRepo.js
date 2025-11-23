import prisma from "../config/db.js";

export async function getReviewByUserID(userId){
    return await prisma.review.findMany({
        where:{userId}
    })
}