import { Calendar, Clock, Trash2, Edit3, Check } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import { formatDate, formatRelativeDate, isOverdue, truncateText } from '../../utils/helpers';
import './TaskCard.css';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check size={14} />}
        </button>
        
        <div className="task-card-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{truncateText(task.description, 100)}</p>
          )}
        </div>

        <div className="task-actions">
          <button
            className="task-action-btn edit"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Edit3 size={16} />
          </button>
          <button
            className="task-action-btn delete"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="task-card-footer">
        <div className="task-meta">
          <PriorityBadge priority={task.priority} size="sm" />
          
          {task.dueDate && (
            <span className={`task-due-date ${overdue ? 'overdue' : ''}`}>
              <Calendar size={12} />
              <span>{formatRelativeDate(task.dueDate)}</span>
              {overdue && <Clock size={12} className="overdue-icon" />}
            </span>
          )}
        </div>

        {task.completed && (
          <span className="task-completed-badge">
            <Check size={12} /> Completed
          </span>
        )}
      </div>
    </div>
  );
}
