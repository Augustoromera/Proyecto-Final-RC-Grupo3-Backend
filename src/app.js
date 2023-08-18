import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/task.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app  = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Reemplazar con el dominio de la página
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 240,

// Configurar opciones de CORS
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);



export default app;
// app.use(cors({
//     origin:'http://localhost:5173',
//     credentials:true,
// }));