const fs = require('fs');
const path = require('path');
const { commitFilesAtomic, readFileFromRepo, getOctokit } = require('../utils/github');

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

function safeFilename(name) {
  const timestamp = Date.now();
  const clean = name.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
  return `${timestamp}-${clean}`;
}

exports.getPages = (req, res) => {
  const pages = readPagesFile();
  res.json(pages);
};

exports.createPage = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    const file = req.file; // multer puts file here when present
    const body = req.body || {};

    const newPage = {
      title: body.title || '',
      content: body.content || '',
      image_url: '',
      status: body.status || 'published',
      id: nextId(),
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    if (file) {
      const filename = safeFilename(file.originalname);
      const uploadPath = `server/content/uploads/${filename}`;
      const publicPath = `/uploads/${filename}`;
      newPage.image_url = publicPath;

      if (isGit) {
        // Read current pages.json from repo
        let pages = [];
        try {
          const { content } = await readFileFromRepo('server/content/pages.json');
          pages = JSON.parse(content);
        } catch (e) {
          pages = [];
        }
        pages.push(newPage);

        // Prepare files to commit: image blob and updated pages.json
        const files = [
          { path: uploadPath, content: file.buffer },
          { path: 'server/content/pages.json', content: JSON.stringify(pages, null, 2) }
        ];
        const message = `admin: add page "${newPage.title}" (${uploadPath})`;
        await commitFilesAtomic(files, message);

        return res.status(201).json(newPage);
      } else {
        // Fallback: write to disk
        if (!fs.existsSync(path.join(DATA_DIR, 'uploads'))){
          fs.mkdirSync(path.join(DATA_DIR, 'uploads'), { recursive: true });
        }
        fs.writeFileSync(path.join(DATA_DIR, 'uploads', filename), file.buffer);
        const pages = readPagesFile();
        pages.push(newPage);
        writePagesFile(pages);
        return res.status(201).json(newPage);
      }
    } else {
      // No file, proceed with JSON-only update
      if (isGit) {
        let pages = [];
        try {
          const { content } = await readFileFromRepo('server/content/pages.json');
          pages = JSON.parse(content);
        } catch (e) {
          pages = [];
        }
        pages.push(newPage);
        const files = [ { path: 'server/content/pages.json', content: JSON.stringify(pages, null, 2) } ];
        const message = `admin: add page "${newPage.title}"`;
        await commitFilesAtomic(files, message);
        return res.status(201).json(newPage);
      } else {
        const pages = readPagesFile();
        pages.push(newPage);
        writePagesFile(pages);
        return res.status(201).json(newPage);
      }
    }
  } catch (err) {
    console.error('createPage error', err);
    res.status(500).json({ error: err.message || 'Create failed' });
  }
};

exports.getPageById = (req, res) => {
  const pages = readPagesFile();
  const page = pages.find(p => p.id === req.params.id);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
};

exports.updatePage = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    const file = req.file;
    const body = req.body || {};

    if (isGit) {
      // Read current pages.json
      let pages = [];
      let sha;
      try {
        const read = await readFileFromRepo('server/content/pages.json');
        pages = JSON.parse(read.content);
        sha = read.sha;
      } catch (e) {
        pages = [];
      }
      const index = pages.findIndex(p => p.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Page not found' });

      const updated = {
        ...pages[index],
        title: body.title || pages[index].title,
        content: body.content || pages[index].content,
        status: body.status || pages[index].status,
        updated: new Date().toISOString()
      };

      const files = [];
      if (file) {
        const filename = safeFilename(file.originalname);
        const uploadPath = `server/content/uploads/${filename}`;
        const publicPath = `/uploads/${filename}`;
        updated.image_url = publicPath;
        files.push({ path: uploadPath, content: file.buffer });
      }

      pages[index] = updated;
      files.push({ path: 'server/content/pages.json', content: JSON.stringify(pages, null, 2) });
      const message = `admin: update page "${updated.title}" (id=${updated.id})`;
      await commitFilesAtomic(files, message);
      return res.json(updated);
    } else {
      const pages = readPagesFile();
      const index = pages.findIndex(p => p.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Page not found' });
      const updated = {
        ...pages[index],
        ...req.body,
        updated: new Date().toISOString()
      };
      if (file) {
        if (!fs.existsSync(path.join(DATA_DIR, 'uploads'))){
          fs.mkdirSync(path.join(DATA_DIR, 'uploads'), { recursive: true });
        }
        const filename = safeFilename(file.originalname);
        fs.writeFileSync(path.join(DATA_DIR, 'uploads', filename), file.buffer);
        updated.image_url = `/uploads/${filename}`;
      }
      pages[index] = updated;
      writePagesFile(pages);
      return res.json(updated);
    }
  } catch (err) {
    console.error('updatePage error', err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    if (isGit) {
      // Read current pages.json
      let pages = [];
      try {
        const read = await readFileFromRepo('server/content/pages.json');
        pages = JSON.parse(read.content);
      } catch (e) {
        pages = [];
      }
      const filtered = pages.filter(p => p.id !== req.params.id);
      if (pages.length === filtered.length) return res.status(404).json({ error: 'Page not found' });
      const files = [ { path: 'server/content/pages.json', content: JSON.stringify(filtered, null, 2) } ];
      const message = `admin: delete page id=${req.params.id}`;
      await commitFilesAtomic(files, message);
      return res.status(204).end();
    } else {
      const pages = readPagesFile();
      const filtered = pages.filter(p => p.id !== req.params.id);
      if (pages.length === filtered.length) return res.status(404).json({ error: 'Page not found' });
      writePagesFile(filtered);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('deletePage error', err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
};
