const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');

// inicializaciones
const app = express();
require('./config/passport');

// configuraciones
app.set('port', process.env.PORT || 5000)
app.set('views' , path.join(__dirname , 'views') )
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') , '/layouts'),
    partialsDir: path.join(app.get('views') , '/partials'),
    extname: '.hbs'
}));

app.set('view engine', 'hbs');


// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'Naslan28',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// variables globales
app.use((req, res, next)=>{
    res.locals.mensaje_correcto = req.flash('mensaje_correcto');
    res.locals.mensaje_incorrecto = req.flash('mensaje_incorrecto');
    res.locals.error = req.flash('error');
    next();
})


// rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/ticket.routes'))
app.use(require('./routes/usuario.routes'))


// login
app.use(require('./routes/index.routes'));

// add ticket
app.use(require('./routes/ticket.routes'));

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;