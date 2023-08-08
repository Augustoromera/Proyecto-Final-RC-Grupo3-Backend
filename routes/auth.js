const express = require('express');
const { enviarFormulario } = require('../controllers/authControllers');
const { check } = require('express-validator');


const routerAuth = express.Router();


routerAuth.post('/new',[
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastname', 'el apellido es obligatorio').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('phone', 'el teléfono no es válido').isLength({max:13}),
    check('subject', 'el asunto no es válido').not().isEmpty(),
    check('message', 'el mensaje no es válido').not().isEmpty(),
    
],
 enviarFormulario);


module.exports = routerAuth;