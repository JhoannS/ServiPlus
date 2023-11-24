const {Schema, model} = require('mongoose')

const TickeSchema = new Schema({
    titulo:{
        type: String,
        require: [true, "El titulo es obligatorio"],
        maxLength: [20, "El limite de caracteres es de 15"]
    },
    descripcion:{
        type: String,
        require: [true, "La descripcion es obligatoria"],
        maxLength: [100, "El limite de caracteres es de 100"]
    },
    estado:{
        type: String,
        default: "En Proceso"
    },
    
},{
    timestamps: true
})

module.exports = model('Ticket', TickeSchema);