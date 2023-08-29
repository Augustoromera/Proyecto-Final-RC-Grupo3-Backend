import express from 'express';
import { crearPedido } from '../controllers/pedido.controllers.js';

const routerPedido = express.Router();

// Control carga de pedido
routerPedido.post('/nuevoPedido', crearPedido);

export default routerPedido;
