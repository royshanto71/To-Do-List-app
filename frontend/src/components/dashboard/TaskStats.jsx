import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ListTodo,
  TrendingUp
} from 'lucide-react';
import './TaskStats.css';

export default function TaskStats({ stats }) {
  const statCards = [
    {
      label: 'Total Tasks',
      value: stats?.total || 0,
      icon: ListTodo,
      color: 'primary',
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: 'success',
      suffix: stats?.total > 0 ? `(${stats?.completionRate || 0}%)` : '',
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'warning',
    },
    {
      label: 'Overdue',
      value: stats?.overdue || 0,
      icon: AlertTriangle,
      color: 'danger',
    },
  ];

  return (
    <div className="task-stats">
      {statCards.map((stat, index) => (
        <div 
          key={stat.label} 
          className={`stat-card stat-${stat.color}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon">
            <stat.icon size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {stat.value}
              {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
