const {Schema, model} = require ('mongoose');
const formSchema = Schema({
    name:{
        type: 'string',
        required: true,
    },

    lastname:{
        type: 'string',
        required: true,
    },

    email:{
        type: 'string',
        required: true,
    },

    phone:{
        type: 'number',
        required: false,
    },

    subject:{
        type: 'string',
        required: true,
    },

    message:{
        type: 'string',
        required: true,
    }
});

module.exports = model('Form', formSchema);