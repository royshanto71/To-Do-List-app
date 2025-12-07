import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { tasksAPI } from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priority: '',
    completed: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch tasks
  const fetchTasks = useCallback(async (customFilters = {}) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const params = { ...filters, ...customFilters };
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === undefined) {
          delete params[key];
        }
      });
      const response = await tasksAPI.getAll(params);
      setTasks(response.data.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, filters]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await tasksAPI.getStats();
      setStats(response.data.data.stats);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [isAuthenticated]);

  // Fetch upcoming deadlines
  const fetchUpcoming = useCallback(async (days = 7) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await tasksAPI.getUpcoming(days);
      setUpcomingTasks(response.data.data.tasks);
    } catch (err) {
      console.error('Failed to fetch upcoming tasks:', err);
    }
  }, [isAuthenticated]);

  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      setError(null);
      const response = await tasksAPI.create(taskData);
      const newTask = response.data.data.task;
      setTasks(prev => [newTask, ...prev]);
      fetchStats();
      fetchUpcoming();
      return { success: true, task: newTask };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      setError(message);
      return { success: false, error: message };
    }
  }, [fetchStats, fetchUpcoming]);

  // Update task
  const updateTask = useCallback(async (id, taskData) => {
    try {
      setError(null);
      const response = await tasksAPI.update(id, taskData);
      const updatedTask = response.data.data.task;
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      fetchStats();
      fetchUpcoming();
      return { success: true, task: updatedTask };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update task';
      setError(message);
      return { success: false, error: message };
    }
  }, [fetchStats, fetchUpcoming]);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    try {
      setError(null);
      await tasksAPI.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      fetchStats();
      fetchUpcoming();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task';
      setError(message);
      return { success: false, error: message };
    }
  }, [fetchStats, fetchUpcoming]);

  // Toggle task completion
  const toggleTask = useCallback(async (id) => {
    try {
      setError(null);
      const response = await tasksAPI.toggleComplete(id);
      const updatedTask = response.data.data.task;
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      fetchStats();
      return { success: true, task: updatedTask };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to toggle task';
      setError(message);
      return { success: false, error: message };
    }
  }, [fetchStats]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      priority: '',
      completed: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStats();
      fetchUpcoming();
    } else {
      setTasks([]);
      setStats(null);
      setUpcomingTasks([]);
    }
  }, [isAuthenticated, fetchTasks, fetchStats, fetchUpcoming]);

  // Refetch when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [filters, isAuthenticated, fetchTasks]);

  const value = {
    tasks,
    stats,
    upcomingTasks,
    loading,
    error,
    filters,
    fetchTasks,
    fetchStats,
    fetchUpcoming,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    updateFilters,
    resetFilters,
    clearError: () => setError(null),
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

export default TaskContext;
