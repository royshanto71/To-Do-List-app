import taskService from '../services/task.service.js';

/**
 * Task Controller
 * Handles HTTP requests for task operations
 */
class TaskController {
  /**
   * Create a new task
   * POST /api/tasks
   */
  async create(req, res, next) {
    try {
      const task = await taskService.create(req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: { task }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all tasks with filtering and sorting
   * GET /api/tasks
   */
  async getAll(req, res, next) {
    try {
      const { priority, completed, overdue, sortBy, sortOrder, page, limit } = req.query;
      
      const result = await taskService.getAll(req.user.id, {
        priority,
        completed,
        overdue,
        sortBy,
        sortOrder,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50
      });

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single task by ID
   * GET /api/tasks/:id
   */
  async getById(req, res, next) {
    try {
      const task = await taskService.getById(req.user.id, req.params.id);

      res.status(200).json({
        success: true,
        data: { task }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a task
   * PUT /api/tasks/:id
   */
  async update(req, res, next) {
    try {
      const task = await taskService.update(req.user.id, req.params.id, req.body);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: { task }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a task
   * DELETE /api/tasks/:id
   */
  async delete(req, res, next) {
    try {
      await taskService.delete(req.user.id, req.params.id);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Toggle task completion
   * PATCH /api/tasks/:id/toggle
   */
  async toggleComplete(req, res, next) {
    try {
      const task = await taskService.toggleComplete(req.user.id, req.params.id);

      res.status(200).json({
        success: true,
        message: `Task marked as ${task.completed ? 'completed' : 'incomplete'}`,
        data: { task }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get task statistics for dashboard
   * GET /api/tasks/stats
   */
  async getStats(req, res, next) {
    try {
      const stats = await taskService.getStats(req.user.id);

      res.status(200).json({
        success: true,
        data: { stats }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get upcoming deadlines
   * GET /api/tasks/upcoming
   */
  async getUpcoming(req, res, next) {
    try {
      const days = parseInt(req.query.days) || 7;
      const tasks = await taskService.getUpcomingDeadlines(req.user.id, days);

      res.status(200).json({
        success: true,
        data: { tasks }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
