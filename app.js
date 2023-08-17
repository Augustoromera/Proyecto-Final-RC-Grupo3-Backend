//importar librerias
const express = require('express');
const { dbConnection } = require('./database/config');
const app= express();
require('dotenv').config();
const cors = require('cors');

//leactura y parceo del body
app.use(express.json());

//llamar cors
app.use(cors());

//conexion a base de datos
dbConnection();

//directorio publico
app.use(express.static('public'));

app.use('/admin', require('./routes/admin'));
//inicializar server
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
