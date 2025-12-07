import { useTasks } from '../../context/TaskContext';
import TaskStats from './TaskStats';
import PriorityChart from './PriorityChart';
import UpcomingDeadlines from './UpcomingDeadlines';
import Loader from '../common/Loader';
import './Dashboard.css';

export default function Dashboard() {
  const { stats, upcomingTasks, loading } = useTasks();

  if (loading && !stats) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your tasks and productivity</p>
      </div>

      <TaskStats stats={stats} />

      <div className="dashboard-grid">
        <PriorityChart stats={stats} />
        <UpcomingDeadlines tasks={upcomingTasks} />
      </div>
    </div>
  );
}
