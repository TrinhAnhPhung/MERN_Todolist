const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET: Lấy tất cả công việc
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

// POST: Tạo công việc mới
router.post('/new', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

// DELETE: Xóa công việc
router.delete('/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
});

// PUT: Cập nhật (đánh dấu hoàn thành)
router.put('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

module.exports = router;