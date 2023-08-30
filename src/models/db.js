import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () =>{
    try {
      await mongoose.connect(process.env.DB_CNN || 'mongodb+srv://Group3:0Q0cWEOrXOCvAeWJ@backgroup3.baggvkl.mongodb.net/');
      console.log(">>> Base de datos conectada");
    
  } catch (error) {
      console.log(error);
  }
};