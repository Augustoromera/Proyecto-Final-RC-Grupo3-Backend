import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token)
    return res.status(401).json({ message: "No token, authorization denied" });

    next();
}