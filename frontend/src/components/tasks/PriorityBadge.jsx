import './PriorityBadge.css';

export default function PriorityBadge({ priority, size = 'md' }) {
  const priorityConfig = {
    HIGH: { label: 'High', emoji: '🔴', className: 'priority-high' },
    MEDIUM: { label: 'Medium', emoji: '🟡', className: 'priority-medium' },
    LOW: { label: 'Low', emoji: '🟢', className: 'priority-low' },
  };

  const config = priorityConfig[priority?.toUpperCase()] || priorityConfig.MEDIUM;

  return (
    <span className={`priority-badge priority-badge-${size} ${config.className}`}>
      <span className="priority-emoji">{config.emoji}</span>
      <span className="priority-label">{config.label}</span>
    </span>
  );
}
