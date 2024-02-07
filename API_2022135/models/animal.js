const {Schema, model} = require('mongoose');

const AnimalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre de animal obligatorio']
    },
    especie:{
        type: String,
        required: [true, 'Especificar la especie del animal']
    },
    raza:{
        type: String,
        required: [true, 'Especificar la raza del animal']    
    },
    edad:{
        type: Number,
        require: [true, 'Especifica la edad del animal']
    },
    estado:{
        type: Boolean,
        default: true
    },

});

module.exports = model('Animal', AnimalSchema);
