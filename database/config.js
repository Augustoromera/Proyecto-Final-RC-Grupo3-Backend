import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN) || 'mongodb+srv://augusto:wallaby42@proyectoweb.e2tzutv.mongodb.net/';
        console.log('conectado a la base de datos');
    } catch (error) {
        console.log('error');
    }
};
