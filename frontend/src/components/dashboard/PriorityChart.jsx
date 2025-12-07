import { PieChart } from 'lucide-react';
import './PriorityChart.css';

export default function PriorityChart({ stats }) {
  const priorities = [
    { label: 'High', value: stats?.priorityDistribution?.high || 0, color: 'var(--priority-high)' },
    { label: 'Medium', value: stats?.priorityDistribution?.medium || 0, color: 'var(--priority-medium)' },
    { label: 'Low', value: stats?.priorityDistribution?.low || 0, color: 'var(--priority-low)' },
  ];

  const total = priorities.reduce((sum, p) => sum + p.value, 0);

  // Calculate percentages for the ring chart
  let currentOffset = 0;
  const segments = priorities.map((priority) => {
    const percentage = total > 0 ? (priority.value / total) * 100 : 0;
    const segment = {
      ...priority,
      percentage,
      offset: currentOffset,
    };
    currentOffset += percentage;
    return segment;
  });

  return (
    <div className="priority-chart-card">
      <div className="chart-header">
        <PieChart size={20} />
        <h3>Priority Distribution</h3>
      </div>

      {total === 0 ? (
        <div className="chart-empty">
          <p>No pending tasks</p>
        </div>
      ) : (
        <div className="chart-content">
          <div className="chart-ring">
            <svg viewBox="0 0 100 100" className="ring-svg">
              {segments.map((segment, index) => (
                <circle
                  key={segment.label}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="12"
                  strokeDasharray={`${segment.percentage * 2.51} ${251 - segment.percentage * 2.51}`}
                  strokeDashoffset={-segment.offset * 2.51}
                  transform="rotate(-90 50 50)"
                  className="ring-segment"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
              <text x="50" y="50" className="ring-center-text">
                <tspan x="50" dy="-0.2em" className="ring-total">{total}</tspan>
                <tspan x="50" dy="1.4em" className="ring-label">pending</tspan>
              </text>
            </svg>
          </div>

          <div className="chart-legend">
            {segments.map((segment) => (
              <div key={segment.label} className="legend-item">
                <span className="legend-dot" style={{ background: segment.color }} />
                <span className="legend-label">{segment.label}</span>
                <span className="legend-value">{segment.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
