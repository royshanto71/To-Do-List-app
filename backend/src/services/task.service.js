import prisma from '../config/database.js';

/**
 * Task Service
 * Handles all task-related database operations
 */
class TaskService {
  /**
   * Create a new task
   */
  async create(userId, taskData) {
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description || null,
        priority: taskData.priority || 'MEDIUM',
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        completed: taskData.completed || false,
        userId
      }
    });

    return task;
  }

  /**
   * Get all tasks for a user with filtering and sorting
   */
  async getAll(userId, options = {}) {
    const {
      priority,
      completed,
      overdue,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 50
    } = options;

    // Build where clause
    const where = { userId };

    if (priority) {
      where.priority = priority.toUpperCase();
    }

    if (completed !== undefined) {
      where.completed = completed === 'true' || completed === true;
    }

    if (overdue === 'true' || overdue === true) {
      where.dueDate = { lt: new Date() };
      where.completed = false;
    }

    // Build orderBy
    const validSortFields = ['createdAt', 'updatedAt', 'dueDate', 'priority', 'title'];
    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    // Priority sorting needs special handling
    let orderBy;
    if (orderByField === 'priority') {
      // Custom priority ordering (HIGH > MEDIUM > LOW)
      orderBy = [
        { priority: orderByDirection },
        { createdAt: 'desc' }
      ];
    } else {
      orderBy = { [orderByField]: orderByDirection };
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.task.count({ where })
    ]);

    return {
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get a single task by ID
   */
  async getById(userId, taskId) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId
      }
    });

    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    return task;
  }

  /**
   * Update a task
   */
  async update(userId, taskId, updateData) {
    // First verify the task belongs to the user
    await this.getById(userId, taskId);

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(updateData.title !== undefined && { title: updateData.title }),
        ...(updateData.description !== undefined && { description: updateData.description }),
        ...(updateData.priority !== undefined && { priority: updateData.priority.toUpperCase() }),
        ...(updateData.dueDate !== undefined && { 
          dueDate: updateData.dueDate ? new Date(updateData.dueDate) : null 
        }),
        ...(updateData.completed !== undefined && { completed: updateData.completed })
      }
    });

    return task;
  }

  /**
   * Delete a task
   */
  async delete(userId, taskId) {
    // First verify the task belongs to the user
    await this.getById(userId, taskId);

    await prisma.task.delete({
      where: { id: taskId }
    });

    return { message: 'Task deleted successfully' };
  }

  /**
   * Toggle task completion status
   */
  async toggleComplete(userId, taskId) {
    const task = await this.getById(userId, taskId);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed }
    });

    return updatedTask;
  }

  /**
   * Get task statistics for dashboard
   */
  async getStats(userId) {
    const now = new Date();

    const [
      total,
      completed,
      pending,
      overdue,
      highPriority,
      mediumPriority,
      lowPriority,
      dueSoon
    ] = await Promise.all([
      // Total tasks
      prisma.task.count({ where: { userId } }),
      
      // Completed tasks
      prisma.task.count({ where: { userId, completed: true } }),
      
      // Pending tasks
      prisma.task.count({ where: { userId, completed: false } }),
      
      // Overdue tasks (past due date and not completed)
      prisma.task.count({
        where: {
          userId,
          completed: false,
          dueDate: { lt: now }
        }
      }),
      
      // High priority tasks
      prisma.task.count({ where: { userId, priority: 'HIGH', completed: false } }),
      
      // Medium priority tasks
      prisma.task.count({ where: { userId, priority: 'MEDIUM', completed: false } }),
      
      // Low priority tasks
      prisma.task.count({ where: { userId, priority: 'LOW', completed: false } }),
      
      // Tasks due in next 7 days
      prisma.task.count({
        where: {
          userId,
          completed: false,
          dueDate: {
            gte: now,
            lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    return {
      total,
      completed,
      pending,
      overdue,
      dueSoon,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      priorityDistribution: {
        high: highPriority,
        medium: mediumPriority,
        low: lowPriority
      }
    };
  }

  /**
   * Get upcoming deadlines
   */
  async getUpcomingDeadlines(userId, days = 7) {
    const now = new Date();
    const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueDate: {
          gte: now,
          lte: endDate
        }
      },
      orderBy: { dueDate: 'asc' },
      take: 10
    });

    return tasks;
  }
}

export default new TaskService();
