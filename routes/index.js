const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Usu = require('../models/task_usuario');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks
    });
});
router.get('/login', async (req, res) => {
    const tasks = await Task.find();
    res.render('login', {
        tasks
    });
});

router.get('/home', async (req, res) => {
    const tasks = await Task.find();
    res.render('db', {
        tasks
    });
});
router.get('/admin', async (req, res) => {
    const tasks = await Usu.find();
    res.render('admin', {
        tasks
    });
});
router.get('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.find({categoria: id });
    res.render('categorias', {
        tasks
    });
});
router.get('/usu', async (req, res) => {
    const tasks = await Usu.find();
    res.render('usu', {
        tasks
    });
});
router.get('/productos', async (req, res) => {
    const tasks = await Task.find();
    res.render('productos', {
        tasks
    });
});
router.get('/ubicacion', async (req, res) => {
    const tasks = await Task.find();
    res.render('ubicacion', {
        tasks
    });
});
router.get('/agregarusu', async (req, res) => {
    const task_usuario = await Usu.find();
    res.render('agragar_usu', {
        task_usuario
    });
});
router.get('/detalles/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id); res.render('det', {
        task
    });
});
router.get('/detalles/compra/:id', async (req, res) => {
    const { id } = req.params; await Task.updateOne({ _id: id } , { $inc: { "cantidad": -1 } });
    res.redirect('/');
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.post('/add3', async (req, res) => {
    const task_usuario = new Usu(req.body);
    await task_usuario.save();
    res.redirect('/agregarusu');
});
router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id); res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params; 
    const task = await Task.updateMany({ _id: id }, req.body);
    res.redirect('/');
});
router.get('/edit1/:id', async (req, res) => {
    const { id } = req.params;
    const task_usuario = await Usu.findById(id); res.render('edit1', {
        task_usuario
    });
});

router.post('/edit1/:id', async (req, res) => {
    const { id } = req.params; 
    const task = await Usu.updateMany({ _id: id }, req.body);
    res.redirect('/admin');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/');
});
router.get('/delete1/:id', async (req, res) => {
    const { id } = req.params;
    await Usu.remove({ _id: id });
    res.redirect('/admin');
});


module.exports = router;