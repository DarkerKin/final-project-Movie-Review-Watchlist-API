import { signUp, login } from "../services/authService.js";

export async function signUpHandler(req, res){
    const {email,username, password} = req.body;
    const newUser = await signUp(email,username, password);
    res.status(201).json({message: `newUserCreated ${newUser.id}`});
}

export async function loginHandler(req, res){
    const {email, password} = req.body;
    const accessToken = await login(email, password);
    res.status(200).json({message:"Successfully logged in", accessToken})

}