const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    usuario: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true,
    },
    menu: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
});

module.exports = model('Pedido', pedidoSchema);
