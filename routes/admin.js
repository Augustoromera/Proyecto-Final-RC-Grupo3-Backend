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
    listarPedido,
    completarPedido,
    eliminarUsuario
} = require('../controllers/admin.controllers');

const routerAdmin = express.Router();
//control usuario
routerAdmin.get('/listarUsuarios', cargarUsuarios);
routerAdmin.post('/nuevoUsuario', [
    check('name', 'El nombre es obligatorio, o debe ser alfabetico').not().isEmpty().isAlpha(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener al menos 8 caracteres').notEmpty().isLength({ min: 8 }),
    check('rol', 'El rol es obligatoria').not().isEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
], crearUsuario);
routerAdmin.put('/inactivarUsuario', inactivarUsuario);
routerAdmin.put('/editarUsuario', editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id', eliminarUsuario);


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
routerAdmin.put('/completarPedido', completarPedido);
module.exports = routerAdmin;

