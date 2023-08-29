import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN) || 'mongodb+srv://Group3:0Q0cWEOrXOCvAeWJ@backgroup3.baggvkl.mongodb.net/';
        console.log('conectado a la base de datos');
    } catch (error) {
        console.log('error');
    }
};
