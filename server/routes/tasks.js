const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

// Helper — read tasks from file
function readTasks() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper — write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET /api/tasks — get all tasks, newest first
router.get('/', (req, res) => {
  try {
    const tasks = readTasks();
    const sorted = tasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// POST /api/tasks — create a new task
router.post('/', (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description || '',
    dueDate: dueDate || null,
    priority: priority || 'low',   // ← add this line
    completed: false,
    createdAt: new Date().toISOString(),
  };

    const tasks = readTasks();
    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PATCH /api/tasks/:id — edit or toggle a task
router.patch('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[index] = { ...tasks[index], ...req.body };
    writeTasks(tasks);

    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const filtered = tasks.filter((t) => t.id !== req.params.id);

    if (filtered.length === tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    writeTasks(filtered);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;