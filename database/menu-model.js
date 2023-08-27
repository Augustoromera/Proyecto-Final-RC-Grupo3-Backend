import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
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

export default mongoose.model('Menu', menuSchema);
