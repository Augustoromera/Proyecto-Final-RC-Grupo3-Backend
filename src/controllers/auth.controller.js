import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';



export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: ["El email ya está en uso"] });

        const passwordHash = await bcrypt.hash(password, 10);

        // Lista de correos electrónicos que tendrán el rol de administrador
        const adminEmails = ['paulo101@gmail.com', 'augusto101@gmail.com', 'nico101@gmail.com', 'santiago101@gmail.com'];

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role: adminEmails.includes(email) ? 'admin' : 'user', // Toma valor admin si el email está en la lista de administradores
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: 'usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ message: 'el email o la contraseña son incorrectos' });

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token);
        console.log(token);
        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            status: userFound.status,
            role: userFound.role,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};



export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);

};


export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "usuario no encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt
    })

}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            status: userFound.status,
            role: userFound.role,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt,
        });
    });
}


export const createAdminUsers = async (req, res) => {
    try {
        const adminUsers = [
            { username: 'Paulo', email: 'paulo101@gmail.com', password: '123456', role: 'admin' },
            { username: 'Augusto', email: 'augusto101@gmail.com', password: '123456', role: 'admin' },
            { username: 'Nico', email: 'nico101@gmail.com', password: '123456', role: 'admin' },
            { username: 'Santiago', email: 'santiago101@gmail.com', password: '123456', role: 'admin' },
        ];

        for (const adminUser of adminUsers) {
            const existingUser = await User.findOne({ email: adminUser.email });
            if (!existingUser) {
                const passwordHash = await bcrypt.hash(adminUser.password, 10);
                adminUser.password = passwordHash;
                await User.create(adminUser);
            } else {
                existingUser.role = 'admin';
                await existingUser.save();
            }
        }

        res.status(201).json({ message: 'Usuarios administradores creados' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
