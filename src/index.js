require('dotenv').config()

const app = require ('./server')
require('./database');

app.listen(app.get('port'), ()=>{
    console.log("Corriendo en el puerto: " + app.get('port'));
})  