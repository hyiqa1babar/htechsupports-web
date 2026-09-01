// server/controllers/servicesController.js
// CRUD operations for services — GitHub-backed persistence for Vercel

const fs = require('fs');
const path = require('path');
const { commitFilesAtomic, readFileFromRepo, getOctokit } = require('../utils/github');

const DATA_DIR = path.join(__dirname, '..', 'content');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const REPO_PATH = 'server/content/services.json';

function readServicesFile() {
  try {
    const raw = fs.readFileSync(SERVICES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

function writeServicesFile(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
}

function nextId() {
  return Date.now().toString();
}

exports.getServices = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    if (isGit) {
      try {
        const { content } = await readFileFromRepo(REPO_PATH);
        return res.json(JSON.parse(content));
      } catch (_) {
        // Fallback to local file
      }
    }
    res.json(readServicesFile());
  } catch (err) {
    console.error('getServices error', err);
    res.json(readServicesFile());
  }
};

exports.createService = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    const newService = {
      ...req.body,
      id: req.body.id || nextId(),
      slug: req.body.slug || req.body.id || nextId(),
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    if (isGit) {
      let services = [];
      try {
        const { content } = await readFileFromRepo(REPO_PATH);
        services = JSON.parse(content);
      } catch (_) {
        services = [];
      }
      services.push(newService);
      const files = [{ path: REPO_PATH, content: JSON.stringify(services, null, 2) }];
      const message = `admin: add service "${newService.title}"`;
      await commitFilesAtomic(files, message);
      return res.status(201).json(newService);
    } else {
      const services = readServicesFile();
      services.push(newService);
      writeServicesFile(services);
      return res.status(201).json(newService);
    }
  } catch (err) {
    console.error('createService error', err);
    res.status(500).json({ error: err.message || 'Create failed' });
  }
};

exports.getServiceById = (req, res) => {
  const services = readServicesFile();
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
};

exports.updateService = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    const body = req.body || {};

    if (isGit) {
      let services = [];
      try {
        const { content } = await readFileFromRepo(REPO_PATH);
        services = JSON.parse(content);
      } catch (_) {
        services = [];
      }
      const index = services.findIndex(s => s.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Service not found' });

      const updated = {
        ...services[index],
        title: body.title !== undefined ? body.title : services[index].title,
        tagline: body.tagline !== undefined ? body.tagline : services[index].tagline,
        content: body.content !== undefined ? body.content : services[index].content,
        description: body.description !== undefined ? body.description : services[index].description,
        category: body.category !== undefined ? body.category : services[index].category,
        image_url: body.image_url !== undefined ? body.image_url : services[index].image_url,
        badge: body.badge !== undefined ? body.badge : services[index].badge,
        features: body.features !== undefined ? body.features : services[index].features,
        status: body.status || services[index].status,
        updated: new Date().toISOString()
      };

      services[index] = updated;
      const files = [{ path: REPO_PATH, content: JSON.stringify(services, null, 2) }];
      const message = `admin: update service "${updated.title}" (id=${updated.id})`;
      await commitFilesAtomic(files, message);
      return res.json(updated);
    } else {
      const services = readServicesFile();
      const index = services.findIndex(s => s.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Service not found' });
      const updated = {
        ...services[index],
        ...body,
        updated: new Date().toISOString()
      };
      services[index] = updated;
      writeServicesFile(services);
      return res.json(updated);
    }
  } catch (err) {
    console.error('updateService error', err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const isGit = !!getOctokit();
    if (isGit) {
      let services = [];
      try {
        const { content } = await readFileFromRepo(REPO_PATH);
        services = JSON.parse(content);
      } catch (_) {
        services = [];
      }
      const filtered = services.filter(s => s.id !== req.params.id);
      if (services.length === filtered.length) return res.status(404).json({ error: 'Service not found' });
      const files = [{ path: REPO_PATH, content: JSON.stringify(filtered, null, 2) }];
      const message = `admin: delete service id=${req.params.id}`;
      await commitFilesAtomic(files, message);
      return res.status(204).end();
    } else {
      const services = readServicesFile();
      const filtered = services.filter(s => s.id !== req.params.id);
      if (services.length === filtered.length) return res.status(404).json({ error: 'Service not found' });
      writeServicesFile(filtered);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('deleteService error', err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
};