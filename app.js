import express from 'express';
import morgan from 'morgan';
import authRoutes from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from './src/routes/admin.js'
import pedidosRoutes from './src/routes/pedidos.js'
import { connectDB } from './src/models/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Reemplazar con el dominio de la página
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 240,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use('/admin', adminRoutes);
app.use('/pedidos', pedidosRoutes);

// Conecta a la base de datos
connectDB();


app.listen(8080);
console.log('server en puerto', 8080);

export default app;
