const TaskStatus = require('../constants/taskStatus');

let tasks = [
  {
    id: 1,
    title: 'Встановити Angular',
    assignee: 'Андрій',
    dueDate: new Date('2025-03-20'),
    status: TaskStatus.TODO
  }
];

module.exports = tasks;


