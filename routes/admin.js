import express from 'express';
import { check } from 'express-validator';
import {
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
} from '../controllers/admin.controllers.js';

const routerAdmin = express.Router();

// Control de usuarios
routerAdmin.get('/listarUsuarios', cargarUsuarios);
routerAdmin.post('/nuevoUsuario', [
    check('username', 'El nombre es obligatorio, o debe ser alfabético').not().isEmpty().isAlpha(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener al menos 8 caracteres').notEmpty().isLength({ min: 8 }),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
], crearUsuario);
routerAdmin.put('/inactivarUsuario', inactivarUsuario);
routerAdmin.put('/editarUsuario', editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id', eliminarUsuario);

// Control de menú
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

// Control de pedidos
routerAdmin.get('/listarPedido', listarPedido);
routerAdmin.put('/completarPedido', completarPedido);

export default routerAdmin;
