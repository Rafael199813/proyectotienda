const mongoose = require('mongoose');

// colocamos la url de conexión local y el nombre de la base de datos
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

    imagen: String,
    producto: String,
    description: String,
    ingredientes: String,
    precio: Number,
    cantidad: Number,

    status: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('tasks', TaskSchema);
module.exports = user;