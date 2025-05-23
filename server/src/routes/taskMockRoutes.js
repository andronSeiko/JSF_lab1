const express = require('express');
const router = express.Router();

const taskMockController = require('../controllers/taskMockController');
const {
  validateTask,
  validateTaskPatch,
  handleValidationErrors
} = require('../validators/taskValidator');

router.get('/', taskMockController.getTasks);
router.post('/', validateTask, handleValidationErrors, taskMockController.createTask);
router.put('/:id', validateTask, handleValidationErrors, taskMockController.updateTask);
router.patch('/:id', validateTaskPatch, handleValidationErrors, taskMockController.patchTask);
router.delete('/:id', taskMockController.deleteTask);

module.exports = router;

