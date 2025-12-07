import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { User, Mail, Lock, Save, Trash2 } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import './AccountPage.css';

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const { stats } = useTasks();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!profileData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    setProfileLoading(true);
    const result = await updateProfile(profileData);
    setProfileLoading(false);

    if (result.success) {
      toast.success('Profile updated successfully');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <h1 className="account-title">Account Settings</h1>
        <p className="account-subtitle">Manage your profile and preferences</p>
      </div>

      <div className="account-grid">
        {/* Profile Section */}
        <section className="account-section">
          <div className="section-header">
            <User size={20} />
            <h2>Profile Information</h2>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="account-form">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              error={profileErrors.name}
              icon={User}
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              error={profileErrors.email}
              icon={Mail}
            />

            <Button type="submit" icon={Save} loading={profileLoading}>
              Save Changes
            </Button>
          </form>
        </section>

        {/* Stats Section */}
        <section className="account-section">
          <div className="section-header">
            <User size={20} />
            <h2>Account Statistics</h2>
          </div>
          
          <div className="account-stats">
            <div className="account-stat">
              <span className="stat-number">{stats?.total || 0}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="account-stat">
              <span className="stat-number">{stats?.completed || 0}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="account-stat">
              <span className="stat-number">{stats?.completionRate || 0}%</span>
              <span className="stat-label">Completion Rate</span>
            </div>
          </div>

          <div className="member-since">
            <p>
              Member since{' '}
              <strong>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </strong>
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="account-section danger-zone">
          <div className="section-header">
            <Trash2 size={20} />
            <h2>Danger Zone</h2>
          </div>
          
          <p className="danger-text">
            Once you log out, you will need to sign in again to access your account.
          </p>
          
          <Button variant="danger" icon={Lock} onClick={logout}>
            Sign Out
          </Button>
        </section>
      </div>
    </div>
  );
}
