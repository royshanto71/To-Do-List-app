import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskForm from './TaskForm';
import Modal from '../common/Modal';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { Plus, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';
import './TaskList.css';

export default function TaskList() {
  const { tasks, loading, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    
    let result;
    if (editingTask) {
      result = await updateTask(editingTask.id, formData);
      if (result.success) {
        toast.success('Task updated successfully');
      }
    } else {
      result = await createTask(formData);
      if (result.success) {
        toast.success('Task created successfully');
      }
    }

    setSubmitting(false);

    if (result.success) {
      handleCloseModal();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    const result = await deleteTask(taskId);
    if (result.success) {
      toast.success('Task deleted');
    } else {
      toast.error(result.error);
    }
  };

  const handleToggle = async (taskId) => {
    const result = await toggleTask(taskId);
    if (!result.success) {
      toast.error(result.error);
    }
  };

  if (loading) {
    return <Loader text="Loading tasks..." />;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">My Tasks</h2>
        <Button icon={Plus} onClick={handleCreateClick}>
          New Task
        </Button>
      </div>

      <TaskFilters />

      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <ClipboardList size={64} strokeWidth={1.5} />
          <h3>No tasks found</h3>
          <p>Create your first task to get started</p>
          <Button icon={Plus} onClick={handleCreateClick}>
            Create Task
          </Button>
        </div>
      ) : (
        <div className="task-list-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create Task'}
        size="md"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}
