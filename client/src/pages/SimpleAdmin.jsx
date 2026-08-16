import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './SimpleAdmin.css';

const SimpleAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>H-Tech Admin</h2>
        </div>
        <nav className="admin-nav">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: '📊' },
            { key: 'pages', label: 'Manage Pages', icon: '📄' },
            { key: 'blog', label: 'Blog Posts', icon: '✏️' },
            { key: 'services', label: 'Services', icon: '⚙️' },
            { key: 'contacts', label: 'Contact Messages', icon: '📬' },
            { key: 'settings', label: 'Settings', icon: '🔧' },
          ].map(item => (
            <button
              key={item.key}
              className={`admin-nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <span className="admin-user">👤 Admin</span>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-grid">
              {[
                { title: 'Total Pages', value: '12', color: '#00b4d8' },
                { title: 'Blog Posts', value: '8', color: '#06d6a0' },
                { title: 'Services', value: '7', color: '#ffd166' },
                { title: 'Messages', value: '24', color: '#ef476f' },
              ].map(card => (
                <div key={card.title} className="stat-card" style={{ borderTopColor: card.color }}>
                  <h3>{card.title}</h3>
                  <p className="stat-value" style={{ color: card.color }}>{card.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Manage Pages</h2>
                <button className="admin-action-btn">+ Add Page</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr><th>Page</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {['Home', 'Services', 'Sectors', 'Company', 'Careers', 'Contact'].map(page => (
                    <tr key={page}>
                      <td>{page}</td>
                      <td><span className="status-badge published">Published</span></td>
                      <td>Aug 2026</td>
                      <td><button className="edit-btn">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Blog Posts</h2>
                <button className="admin-action-btn">+ New Post</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {['Network Infrastructure Guide', 'IT Asset Disposal Best Practices', 'Wireless Survey Methods'].map(post => (
                    <tr key={post}>
                      <td>{post}</td>
                      <td><span className="status-badge published">Published</span></td>
                      <td>Aug 2026</td>
                      <td><button className="edit-btn">Edit</button> <button className="delete-btn">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Services</h2>
                <button className="admin-action-btn">+ Add Service</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr><th>Service</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {['Professional Service', 'Wireless Survey', 'Network Support', 'Structured Cabling', 'End User Computing', 'ITAD', 'Staff Augmentation'].map(s => (
                    <tr key={s}>
                      <td>{s}</td>
                      <td><span className="status-badge published">Active</span></td>
                      <td><button className="edit-btn">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Contact Messages</h2>
              </div>
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
                      No messages yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Site Settings</h2>
              </div>
              <div className="settings-form">
                <div className="setting-group">
                  <label>Site Title</label>
                  <input type="text" defaultValue="H-Tech Supports" />
                </div>
                <div className="setting-group">
                  <label>Contact Email</label>
                  <input type="email" defaultValue="info@htechsupports.com" />
                </div>
                <div className="setting-group">
                  <label>Phone</label>
                  <input type="text" defaultValue="+44 123 456 7890" />
                </div>
                <button className="admin-action-btn" style={{ marginTop: '1rem' }}>Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SimpleAdmin;
