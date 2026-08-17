const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api', cors());
app.use(express.json());

// Serve uploaded assets (runtime fallback)
app.use('/uploads', express.static(path.join(__dirname, 'content', 'uploads')));

// API Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HTechSupports API Server', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`HTechSupports API Server running on port ${PORT}`);
  });
}

module.exports = app;
