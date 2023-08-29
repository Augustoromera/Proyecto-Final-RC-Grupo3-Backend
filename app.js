import express from 'express';import dotenv from 'dotenv';
import cors from 'cors';

// Rutas
import adminRoutes from './routes/admin.js';
import pedidosRoutes from './routes/pedidos.js';
import { dbConnection }   from './database/config.js';
dotenv.config();

const app = express();

// Leer y analizar el body
app.use(express.json());

// Habilitar CORS
app.use(cors());



// Llamar la función
dbConnection();
// Directorio público
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use('/pedidos', pedidosRoutes);

// Inicializar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
export default app;