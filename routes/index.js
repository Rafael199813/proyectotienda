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
router.get('/productos/categoria/:id', async (req, res) => {
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
router.post('/add2', async (req, res) => {
    const task = new Usu(req.body);
    await task.save();
    res.redirect('/usu');
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
    const { id } = req.params; await Task.updateMany({ _id: id }, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/');
});

module.exports = router;