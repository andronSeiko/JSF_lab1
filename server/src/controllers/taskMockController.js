const tasks = require('../models/taskMockModel');

const getTasks = (req, res) => {
  let filteredTasks = [...tasks];

  if (req.query.status) {
    filteredTasks = filteredTasks.filter(task => task.status === req.query.status);
  }

  res.json(filteredTasks);
};


const createTask = (req, res) => {
  const { title, assignee, dueDate, status } = req.body;

  if (!title || !assignee || !dueDate || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const taskId = tasks.length
    ? Math.max(...tasks.map((task) => task.id)) + 1
    : 1;

  const newTask = {
    id: taskId,
    title,
    assignee,
    dueDate: new Date(dueDate),
    status
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};


const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = {
    ...req.body,
    dueDate: new Date(req.body.dueDate),
  };

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { id: taskId, ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Завдання не знайдено' });
  }
};

const patchTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updates = req.body;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    Object.assign(task, updates);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Завдання не знайдено' });
  }
};


const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: `Завдання ${taskId} видалене` });
  } else {
    res.status(404).json({ message: 'Завдання не знайдено' });
  }
};


module.exports = { getTasks, createTask, updateTask, patchTask, deleteTask };
