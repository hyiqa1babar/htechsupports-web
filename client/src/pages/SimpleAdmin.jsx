import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SimpleAdmin.css';

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
    console.log('startCreate clicked');
    setFormData({});
    setSelectedItem(null);
    setEditMode(true);
  };

  const startEdit = (item) => {
    console.log('startEdit clicked', item);
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
      <aside className="admin-sidebar">
        <nav>
          <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button onClick={() => setActiveTab('pages')}>Pages</button>
          <button onClick={() => setActiveTab('posts')}>Posts</button>
          <button onClick={() => setActiveTab('services')}>Services</button>
          <button onClick={() => setActiveTab('messages')}>Messages</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && (<div>Welcome to admin</div>)}

          {['pages', 'posts', 'services', 'messages'].includes(activeTab) && (
            <div className="admin-panel">
              <h2>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <button className="admin-action-btn" onClick={startCreate}>+</button>

              {/* debug indicator */}
              {editMode && <div style={{ padding: 8, background: '#fffbcc', marginBottom: 8 }}>Edit mode active</div>}

              {notice && <div style={{ padding: 8, background: '#eef', marginBottom: 8 }}>{notice}</div>}

              {editMode && (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    {formData.image_url && <img src={formData.image_url} alt="Thumbnail" style={{ maxWidth: '200px' }} />}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <textarea
                      name="content"
                      placeholder="Content"
                      value={formData.content || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => { setEditMode(false); setSelectedItem(null); setFormData({}); }}
                    >Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                  </div>
                </form>
              )}

              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {currentList().map(p => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>{p.status}</td>
                      <td>
                        <button onClick={() => startEdit(p)}>Edit</button>
                        <button onClick={() => toggleStatus(p.id)}>{p.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
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
