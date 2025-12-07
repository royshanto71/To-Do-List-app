import { Router } from 'express';
import { body, param, query } from 'express-validator';
import taskController from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/tasks/stats
 * @desc    Get task statistics for dashboard
 * @access  Private
 */
router.get('/stats', taskController.getStats);

/**
 * @route   GET /api/tasks/upcoming
 * @desc    Get upcoming deadlines
 * @access  Private
 */
router.get(
  '/upcoming',
  [
    query('days')
      .optional()
      .isInt({ min: 1, max: 30 })
      .withMessage('Days must be between 1 and 30')
  ],
  validate,
  taskController.getUpcoming
);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks with filtering and sorting
 * @access  Private
 */
router.get(
  '/',
  [
    query('priority')
      .optional()
      .isIn(['LOW', 'MEDIUM', 'HIGH', 'low', 'medium', 'high'])
      .withMessage('Priority must be LOW, MEDIUM, or HIGH'),
    query('completed')
      .optional()
      .isIn(['true', 'false'])
      .withMessage('Completed must be true or false'),
    query('sortBy')
      .optional()
      .isIn(['createdAt', 'updatedAt', 'dueDate', 'priority', 'title'])
      .withMessage('Invalid sort field'),
    query('sortOrder')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Sort order must be asc or desc'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],
  validate,
  taskController.getAll
);

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title must be less than 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description must be less than 2000 characters'),
    body('priority')
      .optional()
      .isIn(['LOW', 'MEDIUM', 'HIGH'])
      .withMessage('Priority must be LOW, MEDIUM, or HIGH'),
    body('dueDate')
      .optional({ nullable: true })
      .isISO8601()
      .withMessage('Due date must be a valid date'),
    body('completed')
      .optional()
      .isBoolean()
      .withMessage('Completed must be a boolean')
  ],
  validate,
  taskController.create
);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Private
 */
router.get(
  '/:id',
  [
    param('id')
      .isUUID()
      .withMessage('Invalid task ID')
  ],
  validate,
  taskController.getById
);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put(
  '/:id',
  [
    param('id')
      .isUUID()
      .withMessage('Invalid task ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 200 })
      .withMessage('Title must be less than 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description must be less than 2000 characters'),
    body('priority')
      .optional()
      .isIn(['LOW', 'MEDIUM', 'HIGH'])
      .withMessage('Priority must be LOW, MEDIUM, or HIGH'),
    body('dueDate')
      .optional({ nullable: true })
      .custom((value) => {
        if (value === null || value === '') return true;
        return !isNaN(Date.parse(value));
      })
      .withMessage('Due date must be a valid date or null'),
    body('completed')
      .optional()
      .isBoolean()
      .withMessage('Completed must be a boolean')
  ],
  validate,
  taskController.update
);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete(
  '/:id',
  [
    param('id')
      .isUUID()
      .withMessage('Invalid task ID')
  ],
  validate,
  taskController.delete
);

/**
 * @route   PATCH /api/tasks/:id/toggle
 * @desc    Toggle task completion status
 * @access  Private
 */
router.patch(
  '/:id/toggle',
  [
    param('id')
      .isUUID()
      .withMessage('Invalid task ID')
  ],
  validate,
  taskController.toggleComplete
);

export default router;
