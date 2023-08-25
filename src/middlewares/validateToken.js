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
    const user = req.user; 

    if (user && user.role === 'admin') {
        next(); // Usuario es administrador, permite el acceso.
    } else {
        res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
    }
};
