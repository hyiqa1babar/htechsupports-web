import React, { useState } from 'react';

const SimpleAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    const valid = username === 'admin' && password === 'admin123';
    if (valid) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleLogin} style={{ padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--hts-deep-teal)' }}>Admin Login</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
          <button type="submit" style={{ width: '100%', padding: '0.75rem', background: 'var(--hts-midnight-navy)', color: '#fff', border: 'none', borderRadius: '4px' }}>Login</button>
        </form>
      </div>
    );
  }

  // Simple placeholder admin UI after successful login
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: 'var(--hts-deep-teal)' }}>Admin Dashboard</h1>
      <p>This is a minimal admin page. You can extend it to edit site content, images, colours, etc.</p>
    </div>
  );
};

export default SimpleAdmin;
