const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contact', contactRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HTechSupports API Server' });
});

app.listen(PORT, () => {
  console.log(`HTechSupports API Server running on port ${PORT}`);
});
