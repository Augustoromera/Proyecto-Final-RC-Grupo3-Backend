import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN || 'mongodb+srv://augusto:wallaby42@proyectoweb.e2tzutv.mongodb.net/');
    console.log(">>> Base de datos conectada");

  } catch (error) {
    console.log(error);
  }
};