const express = require('express');
const { crearPedido } = require('../controllers/pedido.controllers');
const routerPedido = express.Router();

//control carga de pedido
routerPedido.post('/nuevoPedido', crearPedido);


module.exports = routerPedido;