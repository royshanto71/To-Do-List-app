import { format, formatDistanceToNow, isToday, isTomorrow, isPast, addDays } from 'date-fns';

/**
 * Format a date for display
 */
export function formatDate(date, formatStr = 'MMM d, yyyy') {
  if (!date) return '';
  return format(new Date(date), formatStr);
}

/**
 * Format a date relative to now
 */
export function formatRelativeDate(date) {
  if (!date) return '';
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  if (isTomorrow(dateObj)) {
    return 'Tomorrow';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Check if a date is overdue
 */
export function isOverdue(date, completed = false) {
  if (!date || completed) return false;
  return isPast(new Date(date));
}

/**
 * Check if a date is due soon (within specified days)
 */
export function isDueSoon(date, days = 3) {
  if (!date) return false;
  const dateObj = new Date(date);
  const now = new Date();
  const threshold = addDays(now, days);
  return dateObj <= threshold && dateObj >= now;
}

/**
 * Get priority color
 */
export function getPriorityColor(priority) {
  switch (priority?.toUpperCase()) {
    case 'HIGH':
      return {
        bg: 'var(--priority-high-light)',
        text: 'var(--priority-high)',
        border: 'var(--priority-high)',
      };
    case 'MEDIUM':
      return {
        bg: 'var(--priority-medium-light)',
        text: 'var(--priority-medium)',
        border: 'var(--priority-medium)',
      };
    case 'LOW':
      return {
        bg: 'var(--priority-low-light)',
        text: 'var(--priority-low)',
        border: 'var(--priority-low)',
      };
    default:
      return {
        bg: 'var(--gray-200)',
        text: 'var(--gray-600)',
        border: 'var(--gray-400)',
      };
  }
}

/**
 * Get priority label
 */
export function getPriorityLabel(priority) {
  switch (priority?.toUpperCase()) {
    case 'HIGH':
      return '🔴 High';
    case 'MEDIUM':
      return '🟡 Medium';
    case 'LOW':
      return '🟢 Low';
    default:
      return priority;
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format date for input field
 */
export function formatDateForInput(date) {
  if (!date) return '';
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(completed, total) {
  if (!total || total === 0) return 0;
  return Math.round((completed / total) * 100);
}
