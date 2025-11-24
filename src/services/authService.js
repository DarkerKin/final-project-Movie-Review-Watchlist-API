import bcrypt from 'bcrypt';
import { Prisma } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import { createUser,findUserByEmail } from '../repositories/userRepo.js';


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export async function signUp(email, username, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await createUser({email, username, password:hashedPassword});
        return newUser;
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code == 'P2002'){
                const error = new Error("Username/Email has already been used");
                error.status = 409
                throw error;
            }
            throw error;
        }
    }
}

export  async function login(email, password){
    const user = await findUserByEmail(email);
    if(!user){
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const accessToken = jwt.sign({id:user.id, role:user.role}, JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
    return accessToken;
}
