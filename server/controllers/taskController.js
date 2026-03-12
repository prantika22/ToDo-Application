const db = require('../db/db-config');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await db('tasks').select('*').orderBy('created_at', 'desc');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const [newTask] = await db('tasks').insert({ title }).returning('*');
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (completed !== undefined) updateData.completed = completed;

        const [updatedTask] = await db('tasks')
            .where({ id })
            .update(updateData)
            .returning('*');

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await db('tasks').where({ id }).del();
        if (!deletedCount) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
