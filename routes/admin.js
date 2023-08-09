const express = require('express');
const { check } = require('express-validator');
const {
    cargarUsuarios,
    cargarMenu,
    crearMenu,
    editarMenu,
    eliminarMenu
} = require('../controllers/admin.controllers');

const routerAdmin = express.Router();

routerAdmin.get('/usuarios', cargarUsuarios);

routerAdmin.get('/menus', cargarMenu);
routerAdmin.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('detalle', 'El detalle es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty()
], crearMenu);

routerAdmin.put('/editar', editarMenu);
routerAdmin.delete('/eliminar/:id', eliminarMenu);

module.exports = routerAdmin;

