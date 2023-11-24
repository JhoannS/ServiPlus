const mongoose = require('mongoose')

const{SERVIPLUS_MONGO_HOST, SERVIPLUS_MONGO_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${SERVIPLUS_MONGO_HOST}/${SERVIPLUS_MONGO_DATABASE}`

mongoose.connect(MONGODB_URI)
.then(db => console.log("Conectado a MONGODB"))
.catch(err => console.log(err));