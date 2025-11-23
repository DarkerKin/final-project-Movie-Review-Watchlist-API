import { deleteUser, getUserWatchlist, getUserReview, getAllUsers,getUser,updateUser, updateUserRoleById } from "../services/userService.js";
import bcrypt from 'bcrypt';

export async function getAllUsersHandler(req, res){
    const users = await getAllUsers();
    res.status(200).json(users)
}

export async function getUserHandler(req, res){
    const userId = parseInt(req.user.id);
    const user = await getUser(userId);   
    res.status(200).json(user);
}

export async function updateUserHandler(req, res){
    const userId = req.user.id;
    const userProfileUpdates = {};
    if(req.body.email) userProfileUpdates.email = req.body.email;
    if(req.body.username) userProfileUpdates.username = req.body.username;
    if(req.body.password){
        userProfileUpdates.password = await bcrypt.hash(req.body.password, 10);
    } 
    const updatedUser = await updateUser(userId, userProfileUpdates);
    res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res){
    const userId = req.user.id;
    await deleteUser(userId);
    res.status(204).send();
}

export async function getUserReviewHandler(req,res) {
    const userId = req.user.id;
    const userReview = await getUserReview(userId);
    res.status(200).json(userReview);
}

export async function updateUserRoleHandler(req,res){
    const userId = parseInt(req.params.id);
    const userRole = req.body.role.toUpperCase();
    const updatedUser = await updateUserRoleById(userId,userRole);
    res.status(200).json(updatedUser);
}

export async function getUserWatchlistHandler(req,res) {
    const userId = req.user.id;
    const userWatchlist = await getUserWatchlist(userId);
    res.status(200).json(userWatchlist);
}