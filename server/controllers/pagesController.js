// server/controllers/pagesController.js
// CRUD operations for pages using file-based JSON storage

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'content');
const PAGES_FILE = path.join(DATA_DIR, 'pages.json');

function readPagesFile() {
  try {
    const raw = fs.readFileSync(PAGES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

function writePagesFile(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(PAGES_FILE, JSON.stringify(data, null, 2));
}

function nextId() {
  return Date.now().toString();
}

exports.getPages = (req, res) => {
  const pages = readPagesFile();
  res.json(pages);
};

exports.createPage = (req, res) => {
  const newPage = {
    ...req.body,
    id: nextId(),
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };

  const pages = readPagesFile();
  pages.push(newPage);
  writePagesFile(pages);

  res.status(201).json(newPage);
};

exports.getPageById = (req, res) => {
  const pages = readPagesFile();
  const page = pages.find(p => p.id === req.params.id);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
};

exports.updatePage = (req, res) => {
  const pages = readPagesFile();
  const index = pages.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Page not found' });

  const updated = {
    ...pages[index],
    ...req.body,
    updated: new Date().toISOString()
  };
  pages[index] = updated;
  writePagesFile(pages);
  res.json(updated);
};

exports.deletePage = (req, res) => {
  const pages = readPagesFile();
  const filtered = pages.filter(p => p.id !== req.params.id);
  if (pages.length === filtered.length) {
    return res.status(404).json({ error: 'Page not found' });
  }
  writePagesFile(filtered);
  res.status(204).end();
};