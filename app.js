import express from 'express';import dotenv from 'dotenv';
import cors from 'cors';

// Rutas
import adminRoutes from './routes/admin.js';
dotenv.config();

const app = express();

// Leer y analizar el body
app.use(express.json());

// Habilitar CORS
app.use(cors());

import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN || 'mongodb+srv://Group3:0Q0cWEOrXOCvAeWJ@backgroup3.baggvkl.mongodb.net');
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log('Error de conexión a la base de datos:', error);
    }
};

// Llamar la función
dbConnection();
// Directorio público
app.use(express.static('public'));

app.use('/admin', adminRoutes);

// Inicializar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
export default app;