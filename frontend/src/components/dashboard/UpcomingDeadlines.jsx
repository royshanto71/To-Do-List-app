import { Link } from 'react-router-dom';
import { CalendarClock, ArrowRight } from 'lucide-react';
import PriorityBadge from '../tasks/PriorityBadge';
import { formatDate, formatRelativeDate } from '../../utils/helpers';
import './UpcomingDeadlines.css';

export default function UpcomingDeadlines({ tasks = [] }) {
  return (
    <div className="upcoming-card">
      <div className="upcoming-header">
        <CalendarClock size={20} />
        <h3>Upcoming Deadlines</h3>
      </div>

      {tasks.length === 0 ? (
        <div className="upcoming-empty">
          <p>No upcoming deadlines</p>
        </div>
      ) : (
        <>
          <div className="upcoming-list">
            {tasks.slice(0, 5).map((task, index) => (
              <div 
                key={task.id} 
                className="upcoming-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="upcoming-item-content">
                  <span className="upcoming-title">{task.title}</span>
                  <div className="upcoming-meta">
                    <PriorityBadge priority={task.priority} size="sm" />
                    <span className="upcoming-date">
                      {formatRelativeDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tasks.length > 5 && (
            <Link to="/tasks" className="upcoming-more">
              <span>View all tasks</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </>
      )}
    </div>
  );
}
