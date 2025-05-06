const { check, validationResult } = require('express-validator');
const TaskStatus = require('../constants/taskStatus');

const ALLOWED_FIELDS = ['title', 'description', 'assignee', 'dueDate', 'status'];

const validateTask = [
  check('title').notEmpty().withMessage('Поле title є обов’язковим'),
  check('assignee').notEmpty().withMessage('Поле assignee є обов’язковим'),
  check('dueDate').notEmpty().isISO8601().toDate().withMessage('Поле dueDate є обов’язковим'),
  check('status').isIn(Object.values(TaskStatus)).withMessage('Некоректний статус'),
  (req, res, next) => {
    const extraFields = Object.keys(req.body).filter(k => !ALLOWED_FIELDS.includes(k));
    if (extraFields.length) return res.status(400).json({ error: `Зайві поля: ${extraFields.join(', ')}` });
    next();
  }
];

const validateTaskPatch = [
  check('status').optional().isIn(Object.values(TaskStatus)).withMessage('Некоректний статус'),
  (req, res, next) => {
    const extraFields = Object.keys(req.body).filter(k => !ALLOWED_FIELDS.includes(k));
    if (extraFields.length) return res.status(400).json({ error: `Зайві поля: ${extraFields.join(', ')}` });
    next();
  }
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { validateTask, validateTaskPatch, handleValidationErrors };

