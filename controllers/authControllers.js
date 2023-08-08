const { validationResult } = require('express-validator');
const Form = require('../model/form-model');
const enviarFormulario = async (req, res) => {

    const {name, lastname, email, phone, subject, message} = req.body;

    //validacion de express-validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ 
            errors: errors.mapped(),
        });
    };

   form = new Form(req.body);
    
   await form.save();
   
    res.json({
        saludo: 'Formulario enviado correctamente!',
    });
};

module.exports = {enviarFormulario};