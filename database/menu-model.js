const { Schema, model } = require('mongoose');

const menuSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    detalle: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
});

module.exports = model('Menu', menuSchema);
