import { Filter, ArrowUpDown, X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import './TaskFilters.css';

export default function TaskFilters() {
  const { filters, updateFilters, resetFilters } = useTasks();

  const hasActiveFilters = filters.priority || filters.completed;

  return (
    <div className="task-filters">
      <div className="filters-row">
        <div className="filter-group">
          <Filter size={16} />
          <select
            className="filter-select"
            value={filters.priority}
            onChange={(e) => updateFilters({ priority: e.target.value })}
          >
            <option value="">All Priorities</option>
            <option value="HIGH">🔴 High</option>
            <option value="MEDIUM">🟡 Medium</option>
            <option value="LOW">🟢 Low</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={filters.completed}
            onChange={(e) => updateFilters({ completed: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="false">⏳ Pending</option>
            <option value="true">✅ Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <ArrowUpDown size={16} />
          <select
            className="filter-select"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              updateFilters({ sortBy, sortOrder });
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Soonest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="priority-desc">Priority (High → Low)</option>
            <option value="priority-asc">Priority (Low → High)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={resetFilters}>
            <X size={14} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
