const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const EmpleadoSchema = new Schema({
    nombre:{
        type : String,
        required: [true , "nombre de usuario es requerido"]
    },
    email:{
        type : String,
        required: [true , "correo del usuario es requerido"],
        match:[ 
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ,
            "email no valido"
        ]
    },
    cargo:{
        type : String,
        required: [true , "Tipo de usuario es requerido"],
        enum:[
            "Empleado",
        ]
    },
    password:{
        type : String,
        required: [true , "contraseña de user es requerido"],
        max: [12, "contraseña de user maximo de 12 caracteres"],
        select: false
    }
},{
    timestamps: true
});

EmpleadoSchema.methods.encrypPassword = async password => {
    const salt =await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

EmpleadoSchema.methods.matchPassword  = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = model('Usuarios', EmpleadoSchema)