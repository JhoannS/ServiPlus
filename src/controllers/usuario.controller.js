const { log } = require("handlebars")
const Usuario = require('../models/Usuario')
const passport = require("passport")
const userController = {}

userController.renderRegistroForm = (req, res) =>{
    res.render('./registro')
}

userController.Registro = async(req, res) =>{
    const errores = [];
    const {nombre, email, cargo, password, password2} = req.body
    if ((nombre == "") || (email == "") || (cargo == "") || (password == "") || (password2 == "")) {  //COMPRUEBA CAMPOS VACIOS
        errores.push({text:'Algunos de los campos estan vacios.'})
    }
    if(password != password2){
        errores.push({text:'las contraseñas no coinciden'})
    }
    if(password.length <8){
        errores.push({text:'la contraseña no puede ser inferior a 8 caracteres'})
    }
    if(password.length >12){
        errores.push({text:'la contraseña no puede ser superior a 12 caracteres'})
    }
    if (errores.length >0){
        res.render('./registro',{errores,nombre,email,cargo})
    } else{
        const emailUsuario = await Usuario.findOne({email:email})
        if (emailUsuario){
            req.flash('mensaje_incorrecto', "El correo ingresado ya esta en uso, intente nuevamente");
            res.redirect('/registro')
        } else {
            Usuario.create(req.body)
            .then(() =>{
                req.flash('mensaje_correcto', 'Ya estas registrado, inicia sesion.')
                res.redirect('/')
            })
            .catch(err =>{
                console.log(err);
            })
    }
}
}


userController.renderLoginForm = (req, res) =>{
    res.render('/')
}

userController.Login = (req, res) =>{
    res.redirect("/ticket/index")
};
    
userController.CerrarSesion = (req, res) =>{
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "mensaje_correcto" , "Session cerrada" );
        res.redirect( "/" );

    });
}


module.exports = userController;

