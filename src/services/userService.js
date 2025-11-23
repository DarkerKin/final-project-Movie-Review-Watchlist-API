import { getReviewByUserID } from "../repositories/reviewRepo.js";
import { getUserWatchlistFromDB } from "../repositories/watchlistRepo.js";
import { deleteUserById, findAllUsers, findUserById,updateUserById, updateUserRole } from "../repositories/userRepo.js";

export async function getAllUsers(){
    return await findAllUsers();
}

export async function getUser(userId) {
    return await findUserById(userId);
}

export async function updateUser(userId, userProfileUpdates){
    
    return await updateUserById(userId, userProfileUpdates);
}

export async function deleteUser(userId){
    const deletedUser = await deleteUserById(userId);
    if(deleteUser) return;
    else{
        const error = new Error(`cannot find user`);
        error.status = 404
        throw error;
    }
}

export async function getUserReview(userId) {
    const userReviews = await getReviewByUserID(userId);
    return userReviews;
}

export async function updateUserRoleById(userId,userRole){
    const updatedUser = await updateUserRole(userId,userRole);
    return updatedUser;
}

export async function getUserWatchlist(userId) {
    const userWatchlist = await getUserWatchlistFromDB(userId);
    return userWatchlist;
}