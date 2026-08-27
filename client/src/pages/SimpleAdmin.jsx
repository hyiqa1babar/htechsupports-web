import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SimpleAdmin.css';

export default function SimpleAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [messageFilter, setMessageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal / Edit state
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  // Centralized fetch
  const fetchData = async () => {
    try {
      const [p, po, s, m] = await Promise.all([
        axios.get('/api/pages').catch(() => ({ data: [] })),
        axios.get('/api/posts').catch(() => ({ data: [] })),
        axios.get('/api/services').catch(() => ({ data: [] })),
        axios.get('/api/contact').catch(() => ({ data: [] }))
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

  // Form input changes
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, image_file: file, image_url: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    const base = activeTab === 'messages' ? 'contact' : activeTab;

    try {
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
      setNotice('Saved successfully!');
      setTimeout(() => setNotice(''), 3000);
    } catch (err) {
      console.error('Save failed', err);
      setNotice('Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const listMap = { pages, posts, services };
      const list = listMap[activeTab] || [];
      const item = list.find(i => i.id === id);
      const newStatus = (item?.status === 'published') ? 'draft' : 'published';
      await axios.put(`/api/${activeTab}/${id}`, { status: newStatus });
      await fetchData();
    } catch (err) {
      console.error('Toggle status failed', err);
      setNotice('Status toggle failed');
    }
  };

  const updateMessageStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/contact/${id}/status`, { status: newStatus });
      if (viewingMessage && viewingMessage.id === id) {
        setViewingMessage(prev => ({ ...prev, status: newStatus }));
      }
      await fetchData();
    } catch (err) {
      console.error('Update status failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const base = activeTab === 'messages' ? 'contact' : activeTab;
      await axios.delete(`/api/${base}/${id}`);
      if (viewingMessage && viewingMessage.id === id) setViewingMessage(null);
      await fetchData();
      setNotice('Deleted successfully');
      setTimeout(() => setNotice(''), 3000);
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

  // Metrics
  const unreadMessagesCount = useMemo(() => {
    return messages.filter(m => m.status === 'unread').length;
  }, [messages]);

  const partnerMessagesCount = useMemo(() => {
    return messages.filter(m => (m.type || m.role || '').toLowerCase().includes('partner')).length;
  }, [messages]);

  const careerMessagesCount = useMemo(() => {
    return messages.filter(m => (m.type || m.role || '').toLowerCase().includes('career')).length;
  }, [messages]);

  const newsletterMessagesCount = useMemo(() => {
    return messages.filter(m => (m.type || m.role || '').toLowerCase().includes('newsletter')).length;
  }, [messages]);

  // Filtered Messages List
  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      // Tab filter
      const type = (m.type || m.role || '').toLowerCase();
      if (messageFilter === 'unread' && m.status !== 'unread') return false;
      if (messageFilter === 'contact' && (type.includes('partner') || type.includes('career') || type.includes('newsletter'))) return false;
      if (messageFilter === 'partner' && !type.includes('partner')) return false;
      if (messageFilter === 'career' && !type.includes('career')) return false;
      if (messageFilter === 'newsletter' && !type.includes('newsletter')) return false;

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = (m.name || '').toLowerCase().includes(q);
        const matchesEmail = (m.email || '').toLowerCase().includes(q);
        const matchesPhone = (m.phone || '').toLowerCase().includes(q);
        const matchesCompany = (m.company || '').toLowerCase().includes(q);
        const matchesMsg = (m.message || '').toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesPhone || matchesCompany || matchesMsg;
      }

      return true;
    });
  }, [messages, messageFilter, searchQuery]);

  const currentList = () => {
    if (activeTab === 'pages') return pages;
    if (activeTab === 'posts') return posts;
    if (activeTab === 'services') return services;
    return [];
  };

  const getBadgeColor = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('partner')) return 'badge-partner';
    if (t.includes('career')) return 'badge-career';
    if (t.includes('newsletter')) return 'badge-newsletter';
    return 'badge-contact';
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return 'Recent';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="admin-layout">
      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>H-Tech Admin</h2>
          <span className="brand-sub">Management Portal</span>
        </div>
        <div className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon">📊</span> Dashboard
          </button>
          <button className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <span className="nav-icon">📬</span> Contact Messages & Leads
            {unreadMessagesCount > 0 && <span className="nav-unread-badge">{unreadMessagesCount}</span>}
          </button>
          <button className={`admin-nav-item ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>
            <span className="nav-icon">📄</span> Manage Pages
          </button>
          <button className={`admin-nav-item ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
            <span className="nav-icon">✏️</span> Blog Posts
          </button>
          <button className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <span className="nav-icon">⚙️</span> Services
          </button>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <h1>{activeTab === 'messages' ? 'Contact Messages & Form Leads' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="admin-header-desc">
              {activeTab === 'messages'
                ? 'Review and manage incoming inquiries from Contact, Partner, Career, and Newsletter forms.'
                : 'Manage site content, articles, and services.'}
            </p>
          </div>
          <div className="admin-user-pill">
            <span className="user-dot"></span>
            <span>Administrator</span>
          </div>
        </header>

        <div className="admin-content">
          {notice && <div className="admin-notice-banner">{notice}</div>}

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <div className="dashboard-grid">
                <div className="stat-card" style={{ borderTopColor: '#00b4d8' }} onClick={() => setActiveTab('messages')}>
                  <div className="stat-icon-wrap" style={{ background: 'rgba(0,180,216,0.15)', color: '#00b4d8' }}>📬</div>
                  <div>
                    <h3>Total Inquiries / Leads</h3>
                    <div className="stat-value" style={{ color: '#00b4d8' }}>{messages.length}</div>
                    <span className="stat-sub">{unreadMessagesCount} unread submissions</span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderTopColor: '#06d6a0' }} onClick={() => { setActiveTab('messages'); setMessageFilter('partner'); }}>
                  <div className="stat-icon-wrap" style={{ background: 'rgba(6,214,160,0.15)', color: '#06d6a0' }}>🤝</div>
                  <div>
                    <h3>Partner Applications</h3>
                    <div className="stat-value" style={{ color: '#06d6a0' }}>{partnerMessagesCount}</div>
                    <span className="stat-sub">Service partner leads</span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderTopColor: '#ffd166' }} onClick={() => { setActiveTab('messages'); setMessageFilter('career'); }}>
                  <div className="stat-icon-wrap" style={{ background: 'rgba(255,209,102,0.15)', color: '#ffd166' }}>👷</div>
                  <div>
                    <h3>Career / CV Applicants</h3>
                    <div className="stat-value" style={{ color: '#ffd166' }}>{careerMessagesCount}</div>
                    <span className="stat-sub">Field engineers & specialists</span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderTopColor: '#a78bfa' }} onClick={() => { setActiveTab('messages'); setMessageFilter('newsletter'); }}>
                  <div className="stat-icon-wrap" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>✉️</div>
                  <div>
                    <h3>Newsletter Subscribers</h3>
                    <div className="stat-value" style={{ color: '#a78bfa' }}>{newsletterMessagesCount}</div>
                    <span className="stat-sub">Insights audience</span>
                  </div>
                </div>
              </div>

              {/* Recent Messages Quick Table */}
              <div className="admin-panel" style={{ marginTop: '2rem' }}>
                <div className="panel-header">
                  <h2>Recent Inquiries & Leads</h2>
                  <button className="admin-action-btn" onClick={() => setActiveTab('messages')}>View All Messages →</button>
                </div>
                {messages.length === 0 ? (
                  <div className="admin-empty-state">
                    <p>No messages received yet. When visitors submit contact, partner, career, or newsletter forms, they will appear here.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Sender</th>
                          <th>Type</th>
                          <th>Company / Role</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.slice(0, 5).map(m => (
                          <tr key={m.id}>
                            <td>{formatDate(m.createdAt)}</td>
                            <td>
                              <strong>{m.name}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{m.email}</div>
                            </td>
                            <td><span className={`type-badge ${getBadgeColor(m.type || m.role)}`}>{m.type || m.role || 'General'}</span></td>
                            <td>{m.company || m.role || '—'}</td>
                            <td>
                              <span className={`status-badge-lead ${m.status === 'unread' ? 'unread' : m.status === 'replied' ? 'replied' : 'read'}`}>
                                {m.status || 'unread'}
                              </span>
                            </td>
                            <td>
                              <button className="view-btn" onClick={() => { setViewingMessage(m); if (m.status === 'unread') updateMessageStatus(m.id, 'read'); }}>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CONTACT MESSAGES & LEADS TAB ── */}
          {activeTab === 'messages' && (
            <div className="admin-panel">
              {/* Filter Tabs & Search */}
              <div className="messages-toolbar">
                <div className="messages-filter-tabs">
                  <button className={`filter-tab ${messageFilter === 'all' ? 'active' : ''}`} onClick={() => setMessageFilter('all')}>
                    All ({messages.length})
                  </button>
                  <button className={`filter-tab ${messageFilter === 'unread' ? 'active' : ''}`} onClick={() => setMessageFilter('unread')}>
                    Unread ({unreadMessagesCount})
                  </button>
                  <button className={`filter-tab ${messageFilter === 'contact' ? 'active' : ''}`} onClick={() => setMessageFilter('contact')}>
                    Contact Forms
                  </button>
                  <button className={`filter-tab ${messageFilter === 'partner' ? 'active' : ''}`} onClick={() => setMessageFilter('partner')}>
                    Partner Leads ({partnerMessagesCount})
                  </button>
                  <button className={`filter-tab ${messageFilter === 'career' ? 'active' : ''}`} onClick={() => setMessageFilter('career')}>
                    Careers ({careerMessagesCount})
                  </button>
                  <button className={`filter-tab ${messageFilter === 'newsletter' ? 'active' : ''}`} onClick={() => setMessageFilter('newsletter')}>
                    Newsletter ({newsletterMessagesCount})
                  </button>
                </div>

                <div className="messages-search-wrap">
                  <input
                    type="text"
                    placeholder="Search by name, email, company, keyword…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="messages-search-input"
                  />
                  {searchQuery && (
                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                  )}
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="admin-empty-state">
                  <p>No messages match your current filter or search criteria.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Sender Name & Contact</th>
                        <th>Type / Category</th>
                        <th>Company / Role</th>
                        <th>Message Preview</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map(m => (
                        <tr key={m.id} className={m.status === 'unread' ? 'unread-row' : ''}>
                          <td>
                            <div style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{formatDate(m.createdAt)}</div>
                          </td>
                          <td>
                            <div className="sender-name"><strong>{m.name}</strong></div>
                            <div className="sender-email"><a href={`mailto:${m.email}`}>{m.email}</a></div>
                            {m.phone && <div className="sender-phone">📞 {m.phone}</div>}
                          </td>
                          <td>
                            <span className={`type-badge ${getBadgeColor(m.type || m.role)}`}>
                              {m.type || m.role || 'Contact Form'}
                            </span>
                          </td>
                          <td>
                            <div>{m.company || m.role || '—'}</div>
                          </td>
                          <td>
                            <div className="message-preview-text" title={m.message}>
                              {m.message ? (m.message.length > 80 ? m.message.slice(0, 80) + '…' : m.message) : '—'}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge-lead ${m.status === 'unread' ? 'unread' : m.status === 'replied' ? 'replied' : 'read'}`}>
                              {m.status || 'unread'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons-wrap">
                              <button
                                className="view-btn"
                                onClick={() => {
                                  setViewingMessage(m);
                                  if (m.status === 'unread') updateMessageStatus(m.id, 'read');
                                }}
                              >
                                View
                              </button>
                              {m.status === 'unread' ? (
                                <button className="mark-btn" onClick={() => updateMessageStatus(m.id, 'read')}>
                                  Read
                                </button>
                              ) : m.status === 'read' ? (
                                <button className="mark-btn" onClick={() => updateMessageStatus(m.id, 'replied')}>
                                  Replied
                                </button>
                              ) : null}
                              <button className="delete-btn" onClick={() => handleDelete(m.id)}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CONTENT MANAGEMENT TABS (Pages, Posts, Services) ── */}
          {['pages', 'posts', 'services'].includes(activeTab) && (
            <div className="admin-panel">
              <div className="panel-header">
                <h2>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <button className="admin-action-btn" onClick={startCreate}>+ Add New</button>
              </div>

              {editMode && (
                <div className="settings-form">
                  <h3>{selectedItem ? 'Edit Item' : 'Create New Item'}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="setting-group">
                      <label>Title *</label>
                      <input
                        type="text"
                        name="title"
                        required
                        placeholder="Title"
                        value={formData.title || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="setting-group">
                      <label>Featured Image</label>
                      {formData.image_url && (
                        <img src={formData.image_url} alt="Thumbnail" style={{ maxWidth: '180px', borderRadius: '8px', display: 'block', marginBottom: 8 }} />
                      )}
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
                        rows="6"
                        placeholder="Write content or HTML here..."
                        value={formData.content || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                      <button
                        type="button"
                        className="admin-cancel-btn"
                        onClick={() => { setEditMode(false); setSelectedItem(null); setFormData({}); }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="admin-action-btn" disabled={loading}>
                        {loading ? 'Saving…' : 'Save Item'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentList().map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.title}</strong></td>
                      <td><span className={`status-badge ${p.status}`}>{p.status || 'published'}</span></td>
                      <td>
                        <button className="edit-btn" onClick={() => startEdit(p)}>Edit</button>
                        <button className="edit-btn" onClick={() => toggleStatus(p.id)}>
                          {p.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
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

      {/* ── MESSAGE DETAIL MODAL ── */}
      {viewingMessage && (
        <div className="message-modal-overlay" onClick={() => setViewingMessage(null)}>
          <div className="message-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={`type-badge ${getBadgeColor(viewingMessage.type || viewingMessage.role)}`}>
                  {viewingMessage.type || viewingMessage.role || 'Contact Form'}
                </span>
                <h2>{viewingMessage.subject || viewingMessage.name}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setViewingMessage(null)}>×</button>
            </div>

            <div className="modal-body">
              <div className="modal-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">From</span>
                  <span className="meta-val"><strong>{viewingMessage.name}</strong></span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Email</span>
                  <span className="meta-val">
                    <a href={`mailto:${viewingMessage.email}`} className="email-link">{viewingMessage.email}</a>
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Phone</span>
                  <span className="meta-val">{viewingMessage.phone || 'Not provided'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Company / Role</span>
                  <span className="meta-val">{viewingMessage.company || viewingMessage.role || 'General'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Received Date</span>
                  <span className="meta-val">{formatDate(viewingMessage.createdAt)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Status</span>
                  <span className={`status-badge-lead ${viewingMessage.status === 'unread' ? 'unread' : viewingMessage.status === 'replied' ? 'replied' : 'read'}`}>
                    {viewingMessage.status || 'unread'}
                  </span>
                </div>
              </div>

              <div className="modal-message-box">
                <h4>Message Content / Details:</h4>
                <div className="message-full-text">
                  {viewingMessage.message}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-actions-left">
                {viewingMessage.status !== 'replied' && (
                  <button className="mark-replied-btn" onClick={() => updateMessageStatus(viewingMessage.id, 'replied')}>
                    ✓ Mark as Replied
                  </button>
                )}
                {viewingMessage.status === 'unread' && (
                  <button className="mark-read-btn" onClick={() => updateMessageStatus(viewingMessage.id, 'read')}>
                    Mark as Read
                  </button>
                )}
              </div>
              <div className="modal-actions-right">
                <a
                  href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject || 'Your Inquiry with HTech Supports')}`}
                  className="reply-email-btn"
                >
                  ✉️ Reply via Email
                </a>
                <button className="delete-btn" onClick={() => handleDelete(viewingMessage.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
