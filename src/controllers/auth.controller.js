import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import nodemailer from 'nodemailer';


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
            role: adminEmails.includes(email) ? 'admin' : 'user',
        });

        const userSaved = await newUser.save();

        // Enviar correo electrónico de bienvenida
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Cambia esto según tu proveedor de correo
            auth: {
                user: 'rapiburguers1@gmail.com',
                pass: 'cdtm bopo xwuu emmo ',
            },
        });

        const mailOptions = {
            from: 'rapiburguers1@gmail.com',
            to: email, // Dirección de correo electrónico del usuario registrado
            subject: 'Bienvenido a Rapi Burguers!',
            text: `\
Asunto: Gracias por registrarte en Rapi Burguers - ¡Tu destino de hamburguesas gourmet esta aquí!

Estimado ${username},

Es un placer darte la bienvenida a Rapi Burguers, tu destino definitivo para disfrutar de las mejores hamburguesas gourmet en la ciudad. En nombre de todo nuestro equipo, queremos agradecerte por unirte a nuestra comunidad de amantes de la buena comida.

En Rapi Burguers, nos esforzamos por ofrecer experiencias culinarias excepcionales que deleitarán tu paladar. Nuestro compromiso con la calidad, la frescura de los ingredientes y la creatividad en cada receta nos ha convertido en un lugar de referencia para los amantes de las hamburguesas en toda la región.

Al registrarte en nuestro sitio web, has dado el primer paso para descubrir un mundo de sabores irresistibles. Como miembro de nuestra comunidad, disfrutarás de los siguientes beneficios:

- Acceso exclusivo a nuestro menú completo de hamburguesas gourmet, con opciones que se adaptan a todos los gustos y preferencias.
- Ofertas y promociones especiales reservadas solo para nuestros miembros registrados.
- La conveniencia de realizar pedidos en línea y la opción de entrega rápida a tu puerta.
- Actualizaciones regulares sobre nuestros eventos especiales y nuevas incorporaciones al menú.
- La oportunidad de participar en encuestas y concursos para influir en nuestras futuras ofertas y ganar emocionantes premios.

Tu cuenta en Rapi Burguers te permitirá explorar todo lo que tenemos para ofrecer y facilitará tus pedidos y seguimiento de tus actividades en nuestro sitio web.

Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nuestro equipo de atención al cliente. Estamos aquí para brindarte la mejor experiencia posible.

Una vez más, te damos las gracias por unirte a Rapi Burguers. Esperamos que disfrutes de cada bocado y que encuentres en nosotros tu destino preferido para satisfacer tus antojos de hamburguesas gourmet.

¡Bienvenido a la familia Rapi Burguers!

Atentamente, Equipo de Rapi Burguers`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo electrónico de bienvenida: ' + error);
            } else {
                console.log('Correo electrónico de bienvenida enviado: ' + info.response);
            }
        });

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
