const passport = require ("passport");
const LocalStrategy = require('passport-local').Strategy;
const usuarios = require("../models/Usuario");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // comprobar si existe el usuario
      const usuario = await usuarios.findOne({ email: email });
      if (!usuario) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else{
        const match = await usuarios.matchPassword(password);
        if (match){
          return done(null, usuarios);
        } else{
          return done(null, false, { message: "Contraseña Incorrecta." });
        }  
      }
            
    }
  )
);

passport.serializeUser((usuarios, done) => {
  done(null, usuarios.id);
});

passport.deserializeUser((id, done) => {
  usuarios.findById(id, (err, usuarios) => {
    done(err, usuarios);
  });
});
