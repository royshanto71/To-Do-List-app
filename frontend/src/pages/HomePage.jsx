import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import './HomePage.css';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create and manage tasks in seconds with our intuitive interface',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry-standard security',
    },
    {
      icon: Sparkles,
      title: 'Smart Organization',
      description: 'Priority levels, due dates, and filters keep you organized',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Productivity Made Simple</span>
          </div>
          
          <h1 className="hero-title">
            Organize Your Life with{' '}
            <span className="text-gradient">TaskFlow</span>
          </h1>
          
          <p className="hero-description">
            A modern task management app that helps you stay focused, organized, 
            and productive. Track your tasks, set priorities, and never miss a deadline.
          </p>

          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="secondary">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="mock-task">
              <div className="mock-checkbox checked">
                <CheckSquare size={16} />
              </div>
              <div className="mock-content">
                <span className="mock-title">Complete project proposal</span>
                <span className="mock-badge high">High Priority</span>
              </div>
            </div>
            <div className="mock-task">
              <div className="mock-checkbox">
                <div className="mock-checkbox-empty" />
              </div>
              <div className="mock-content">
                <span className="mock-title">Review team feedback</span>
                <span className="mock-badge medium">Medium Priority</span>
              </div>
            </div>
            <div className="mock-task">
              <div className="mock-checkbox">
                <div className="mock-checkbox-empty" />
              </div>
              <div className="mock-content">
                <span className="mock-title">Schedule weekly meeting</span>
                <span className="mock-badge low">Low Priority</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Why Choose TaskFlow?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
