const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/proyecto-delicias', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});

const TaskSchema = new mongoose.Schema({

    nombre: String,
    correo: String,
    password: String,
    usuario: String,

   
});

const user = mongoose.model('task_usuario', TaskSchema);
module.exports = user;