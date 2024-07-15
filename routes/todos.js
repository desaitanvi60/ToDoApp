// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('index', { todos });
});

// Create a new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    await newTodo.save();
    res.redirect('/todos');
});

// Delete a todo
router.post('/delete/:id', async (req, res) => {
    await Todo.findByIdAndRemove(req.params.id);
    res.redirect('/todos');
});

// Update a todo (toggle completion status)
router.post('/toggle/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.redirect('/todos');
});

module.exports = router;

