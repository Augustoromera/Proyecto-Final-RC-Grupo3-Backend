import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token)
    return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (err,user) =>{
        if(err) return res.status(401).json({ message: "invalid token" });

        req.user= user;
        next();
    })

}


export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next(); // Permite el acceso si es un administrador
    } else {
        res.status(403).json({ message: 'No tienes permiso para acceder a esta página.' });
    }
};
