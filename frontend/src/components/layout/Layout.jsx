import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
          },
          success: {
            iconTheme: {
              primary: 'var(--success)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--error)',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}
