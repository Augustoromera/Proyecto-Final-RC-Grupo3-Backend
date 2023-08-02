//importar librerias
const express = require('express');
require('dotenv').config();

//crear server
const app = express();

const PORT = process.env.PORT || 8080;

//rutas endpoints
app.get('/', (req, res) => {
    res.json({
        success: true,
        response: "Server ON",
    });
});

//inicializar server
app.listen(PORT, ()=>{
    console.log(`server initialized in port : ${PORT}`);
});