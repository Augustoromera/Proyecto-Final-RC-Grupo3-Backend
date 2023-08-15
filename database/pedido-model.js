const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true,
    },
    menus:[ {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    }],
    estado: {
        type: String,
        enum: ['pendiente', 'completado'], 
        default: 'pendiente',
        required: true,
    },
    importeTotal: {
        type: Number,
        default: 0,
        required: true,
    },
});

module.exports = model('Pedido', pedidoSchema);
