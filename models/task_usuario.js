const mongoose = require('mongoose');

// colocamos la url de conexiÃ³n local y el nombre de la base de datos
mongoose.connect('mongodb://localhost:27017/crud-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    sexo: String,
    status: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('tasks', TaskSchema);
module.exports = user;