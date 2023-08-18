import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
      await mongoose.connect('mongodb+srv://Group3:0Q0cWEOrXOCvAeWJ@backgroup3.baggvkl.mongodb.net/');
      console.log(">>> Base de datos conectada");
    
  } catch (error) {
      console.log(error);
  }
};