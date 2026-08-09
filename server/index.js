const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api', cors());
app.use(express.json());

// API Routes
app.use('/api/posts', require('./routes/posts'));
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
