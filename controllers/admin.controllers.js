const { validationResult } = require("express-validator");
const menuModel = require("../database/menu-model");
const usuarioModel = require("../database/usuario-model");
const bcrypt = require('bcrypt');
const cargarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find();
        //el fron necesita este arreglo de usuarios que conseguimos del modelo de la db
        res.status(200).json({
            ok: true,
            usuarios,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'por favor contactate con el administrador',
        });
    }

}
const inactivarUsuario = async (req, res) => {
    try {
        const usuariosInactivar = await usuarioModel.findById(req.body._id);
        if (!usuariosInactivar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún usuario con ese id',
            });
        }
        const usuarioInactivo = req.body;
        usuarioInactivo.estado = 'inactive';
        await usuarioModel.findByIdAndUpdate(req.body._id, usuarioInactivo);
        res.status(200).json({
            msg: 'Usuario inhabilitado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};
const editarUsuario = async (req, res) => {
    try {
        let userId = req.body._id;
        const usuarioEditar = await usuarioModel.findById(userId);
        if (!usuarioEditar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún menú con ese id',
            });
        }
        await usuarioModel.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({
            msg: 'Usuario editado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};
const crearUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            errors: errors.mapped(),
        });
    }
    try {
        const usuario = new usuarioModel(req.body);
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(usuario.password, salt);
        await usuario.save();
        res.status(201).json({
            msg: 'Usuario creado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};

const cargarMenu = async (req, res) => {
    try {
        const menus = await menuModel.find();
        res.status(200).json({
            ok: true,
            menus,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};

const crearMenu = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            errors: errors.mapped(),
        });
    }
    try {
        const menu = new menuModel(req.body);
        await menu.save();
        res.status(201).json({
            msg: 'Menú creado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};

const editarMenu = async (req, res) => {
    try {
        const menuEditar = await menuModel.findById(req.body._id);
        if (!menuEditar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún menú con ese id',
            });
        }
        await menuModel.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({
            msg: 'Menú editado correctamente',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};


const eliminarMenu = async (req, res) => {
    try {
        const menuEliminar = await menuModel.findById(req.params.id);
        if (!menuEliminar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún menú con ese id',
            });
        }
        await menuModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: 'Menú eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Por favor contacta al administrador',
        });
    }
};


module.exports = {
    cargarUsuarios,
    crearMenu,
    cargarMenu,
    editarMenu,
    eliminarMenu,
    crearUsuario,
    inactivarUsuario,
    editarUsuario
}