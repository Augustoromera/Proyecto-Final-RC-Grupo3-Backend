const express = require('express');
const { check } = require('express-validator');
const {
    cargarUsuarios,
    cargarMenu,
    crearMenu,
    editarMenu,
    eliminarMenu,
    crearUsuario,
    inactivarUsuario,
    editarUsuario,
    listarPedido
} = require('../controllers/admin.controllers');

const routerAdmin = express.Router();
//control usuario
routerAdmin.get('/listarUsuarios', cargarUsuarios);
routerAdmin.post('/nuevoUsuario', crearUsuario);
routerAdmin.put('/inactivarUsuario', inactivarUsuario);
routerAdmin.put('/editarUsuario', editarUsuario);



//control menu
routerAdmin.get('/listarMenu', cargarMenu);
routerAdmin.post('/nuevoMenu', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('detalle', 'El detalle es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty()
], crearMenu);
routerAdmin.put('/editarMenu', editarMenu);
routerAdmin.delete('/eliminarMenu/:id', eliminarMenu);

//control pedidos
routerAdmin.get('/listarPedido', listarPedido);

module.exports = routerAdmin;

