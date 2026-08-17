import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SimpleAdmin.css';

const SimpleAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulated data - will be replaced by API calls
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);

  // API integration
  useEffect(() => {
    const fetchData = async () => {
      const [p, po, s, m] = await Promise.all([
        axios.get('/api/pages'),
        axios.get('/api/posts'),
        axios.get('/api/services'),
        axios.get('/api/messages')
      ]);
      setPages(p.data);
      setPosts(po.data);
      setServices(s.data);
      setMessages(m.data);
    );
    };
    fetchData();
    // Fetch on tab change
    return () => setTimeout(fetchData, 100);
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Form state
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Handlers
  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleFileChange = (e) => { formData.image_url = e.target.files?.[0]?.name; };

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.image_url) return;

    const apiData = {
      title: formData.title,
      content: formData.content,
      image_url: formData.image_url,
      status: 'published'
    };

    if (selectedItem) {
      // Update
      axios.put(`/api/${activeTab}s/${selectedItem.id}`, apiData)
        .then(() => { setEditMode(false); fetchData(); });
    } else {
      // Create
      axios.post(`/api/${activeTab}s`, apiData)
        .then(() => { setEditMode(false); setFormData({}); fetchData(); });
    }
  };

  // Status toggle
  const toggleStatus = (id) => {
    const status = selectedItem?.status === 'published' ? 'draft' : 'published';

axios.put(`/api/${activeTab}s/${id}/status`, { status})
      .then(() => { fetchData(); });
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`/api/${activeTab}s/${id}`)
        .then(() => { fetchData(); });
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar (same as before) */}
      <aside className="admin-sidebar">
        {/* → (same code as before) */}
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        <div className="admin-content">
          {/* Toggle between tabs */}
          {activeTab === 'dashboard' && (/* Dashboard content */)}
          {activeTab === 'pages' && (
            <div className="admin-panel">
              <h2>Manage Pages</h2>
              <button className="admin-action-btn" onClick={() => {
                setFormData({});
                setSelectedItem(null);
                setEditMode(true);
              }}>+</button>

              {/* Display/update form here - controlled component with formData */}
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
                    <img src={formData.image_url || '/'}
                         alt="Thumbnail"
                         onChange={handleFileChange}
                      style="max-width:200px" />
                    <input
                      type="file"
                      name="image_url"
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
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => { if (selectedItem) setEditMode(false); setFormData({}); }}
                    >Cancel</button>
                    <button type="submit" className="btn-primary">Save</button>
                  </div>
                </form>
              )}
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {pages.map(p => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>
                        <button onClick={() => { setSelectedItem(p); setEditMode(true); }}>Edit</button>
                        <button onClick={() => toggleStatus(p.id)}>{p.status}</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          }
          {/* Similar structures for posts, services, and messages */}
        </div>
      </main>
    </div>
  );
};

export default SimpleAdmin;