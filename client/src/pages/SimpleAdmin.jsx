import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SimpleAdmin.css';

// Inline fallback styles to ensure admin appears even if external CSS fails to load
const INLINE_ADMIN_STYLES = `
.admin-layout{display:flex;min-height:100vh;background:#071426;color:#fff;font-family:Inter,system-ui,sans-serif}
.admin-sidebar{width:250px;background:#0b1b2a;padding:1.5rem 1rem;display:flex;flex-direction:column}
.admin-brand h2{color:#00b4d8;margin:0 0 1rem 0}
.admin-nav{display:flex;flex-direction:column;gap:8px}
.admin-nav-item{padding:.6rem .8rem;background:transparent;color:rgba(255,255,255,.9);border-radius:6px;text-align:left;cursor:pointer}
.admin-nav-item.active,.admin-nav-item:hover{background:rgba(0,180,216,.08);color:#fff}
.admin-logout-btn{margin-top:auto;padding:.6rem;border-radius:8px;background:#ef476f;color:#fff}
.admin-main{flex:1;display:flex;flex-direction:column}
.admin-header{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.03)}
.admin-content{padding:1.25rem}
.admin-panel{background:rgba(255,255,255,.02);padding:1rem;border-radius:8px}
.admin-action-btn{padding:.5rem .9rem;background:#00b4d8;color:#fff;border-radius:6px}
.admin-table{width:100%;border-collapse:collapse;margin-top:1rem}
.admin-table th{color:rgba(255,255,255,.7);text-align:left;padding:.5rem}
.admin-table td{padding:.5rem}
.status-badge{padding:.25rem .6rem;border-radius:16px;font-size:.8rem}
.status-badge.published{background:rgba(6,214,160,.15);color:#06d6a0}
.edit-btn{padding:.3rem .6rem;margin-right:.3rem;border-radius:6px;background:rgba(0,180,216,.08);color:#00b4d8}
.delete-btn{padding:.3rem .6rem;border-radius:6px;background:rgba(239,71,111,.06);color:#ef476f}
`;

const SimpleAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');

  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);

  // Form state
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  // Resource -> API base mapping (server uses /api/contact for messages)
  const apiBaseFor = (resource) => {
    if (resource === 'messages') return 'contact';
    return resource; // pages, posts, services
  };

  // Centralized fetch
  const fetchData = async () => {
    try {
      const [p, po, s, m] = await Promise.all([
        axios.get('/api/pages'),
        axios.get('/api/posts'),
        axios.get('/api/services'),
        axios.get('/api/contact')
      ]);
      setPages(p.data || []);
      setPosts(po.data || []);
      setServices(s.data || []);
      setMessages(m.data || []);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
      setNotice('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handlers
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // store File object for FormData submission
    setFormData(prev => ({ ...prev, image_file: file, image_url: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    const base = apiBaseFor(activeTab);

    try {
      // build FormData if there's a file
      if (formData.image_file) {
        const fd = new FormData();
        fd.append('title', formData.title || '');
        fd.append('content', formData.content || '');
        fd.append('status', formData.status || 'published');
        fd.append('image', formData.image_file);

        if (selectedItem) {
          await axios.put(`/api/${base}/${selectedItem.id}`, fd);
        } else {
          await axios.post(`/api/${base}`, fd);
        }
      } else {
        const apiData = {
          title: formData.title,
          content: formData.content,
          image_url: formData.image_url || '',
          status: formData.status || 'published'
        };

        if (selectedItem) {
          await axios.put(`/api/${base}/${selectedItem.id}`, apiData);
        } else {
          await axios.post(`/api/${base}`, apiData);
        }
      }

      setEditMode(false);
      setSelectedItem(null);
      setFormData({});
      await fetchData();
      setNotice('Saved');
    } catch (err) {
      console.error('Save failed', err);
      setNotice('Save failed');
    } finally {
      setLoading(false);
    }
  };

  // Toggle status by updating via PUT
  const toggleStatus = async (id) => {
    try {
      const listMap = { pages, posts, services, messages };
      const list = listMap[activeTab] || [];
      const item = list.find(i => i.id === id);
      const newStatus = (item?.status === 'published') ? 'draft' : 'published';
      const base = apiBaseFor(activeTab);
      await axios.put(`/api/${base}/${id}`, { status: newStatus });
      await fetchData();
    } catch (err) {
      console.error('Toggle status failed', err);
      setNotice('Status toggle failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const base = apiBaseFor(activeTab);
      await axios.delete(`/api/${base}/${id}`);
      await fetchData();
      setNotice('Deleted');
    } catch (err) {
      console.error('Delete failed', err);
      setNotice('Delete failed');
    }
  };

  const startCreate = () => {
    setFormData({});
    setSelectedItem(null);
    setEditMode(true);
  };

  const startEdit = (item) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setEditMode(true);
  };

  // current list for activeTab
  const currentList = () => {
    if (activeTab === 'pages') return pages;
    if (activeTab === 'posts') return posts;
    if (activeTab === 'services') return services;
    if (activeTab === 'messages') return messages;
    return [];
  };

  return (
    <div className="admin-layout">
      <style dangerouslySetInnerHTML={{ __html: INLINE_ADMIN_STYLES }} />
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>H-Tech Admin</h2>
        </div>
        <div className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button className={`admin-nav-item ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>Manage Pages</button>
          <button className={`admin-nav-item ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Blog Posts</button>
          <button className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
          <button className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>Contact Messages</button>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-user">Admin</div>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-grid">
              <div className="stat-card"><h3>Total Pages</h3><div className="stat-value">{pages.length}</div></div>
              <div className="stat-card"><h3>Blog Posts</h3><div className="stat-value">{posts.length}</div></div>
              <div className="stat-card"><h3>Services</h3><div className="stat-value">{services.length}</div></div>
              <div className="stat-card"><h3>Messages</h3><div className="stat-value">{messages.length}</div></div>
            </div>
          )}

          {['pages', 'posts', 'services', 'messages'].includes(activeTab) && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <button className="admin-action-btn" onClick={startCreate}>+ Add</button>
              </div>

              {notice && <div style={{ padding: 8, background: '#eef', marginBottom: 8 }}>{notice}</div>}

              {editMode && (
                <div className="settings-form">
                  <form onSubmit={handleSubmit}>
                    <div className="setting-group">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="setting-group">
                      <label>Image</label>
                      {formData.image_url && <img src={formData.image_url} alt="Thumbnail" style={{ maxWidth: '200px', display: 'block', marginBottom: 8 }} />}
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="setting-group">
                      <label>Content</label>
                      <textarea
                        name="content"
                        placeholder="Content"
                        value={formData.content || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => { setEditMode(false); setSelectedItem(null); setFormData({}); }}
                      >Cancel</button>
                      <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    </div>
                  </form>
                </div>
              )}

              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {currentList().map(p => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td><span className={`status-badge ${p.status}`}>{p.status}</span></td>
                      <td>
                        <button className="edit-btn" onClick={() => startEdit(p)}>Edit</button>
                        <button className="edit-btn" onClick={() => toggleStatus(p.id)}>{p.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                        <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SimpleAdmin;
