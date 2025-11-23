import prisma from "../config/db.js";

export async function createUser(data) {
    return await prisma.user.create({data:data, omit:{password:true}});
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({where:{email}});
}

export async function findAllUsers() {
    return await prisma.user.findMany({
        omit:{
            password:true
        }
    })
}

export async function findUserById(id){
    return await prisma.user.findUnique({
        where:{id},
        omit:{
            password:true
        }
    })
}

export async function updateUserById(userId, userProfileUpdates){
    return await prisma.user.update({
        where: {id: userId},
        data: userProfileUpdates,
        omit:{password:true}
    }
    )
}

export async function deleteUserById(userId){

    return await prisma.user.delete({
        where: {id: userId},
    })
}

export async function updateUserRole(userId,userRole){
    return prisma.user.update({
        where:{id:userId},
        data:{
            role: userRole
        },
        omit:{
            password:true
        }
    })
}