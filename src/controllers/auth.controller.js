import User from '../models/user.model.js';


export const register = (req, res) =>{

const {email, password, username} = req.body;

 const newUser = new User({
    username,
    email,
    password,
 })

res.send("registrando")

}



export const login = (req, res) => {

}