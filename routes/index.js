const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks
    });
});

router.get('/home', async (req, res) => {
    const tasks = await Task.find();
    res.render('db', {
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