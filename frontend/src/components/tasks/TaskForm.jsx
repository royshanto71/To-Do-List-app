import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateForInput } from '../../utils/helpers';
import './TaskForm.css';

const initialFormData = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  dueDate: '',
};

export default function TaskForm({ task, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'MEDIUM',
        dueDate: task.dueDate ? formatDateForInput(task.dueDate) : '',
      });
    } else {
      setFormData(initialFormData);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    if (formData.description && formData.description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      dueDate: formData.dueDate || null,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <Input
        label="Task Title"
        name="title"
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        autoFocus
      />

      <Input
        label="Description"
        name="description"
        type="textarea"
        placeholder="Add more details (optional)"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <div className="form-row">
        <div className="input-wrapper">
          <label className="input-label" htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            className="input"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">🟢 Low</option>
            <option value="MEDIUM">🟡 Medium</option>
            <option value="HIGH">🔴 High</option>
          </select>
        </div>

        <Input
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="modal-footer">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
