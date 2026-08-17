// server/controllers/servicesController.js
// CRUD operations for services using file-based JSON storage

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'content');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');

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

exports.getServices = (req, res) => {
  const services = readServicesFile();
  res.json(services);
};

exports.createService = (req, res) => {
  const newService = {
    ...req.body,
    id: nextId(),
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };

  const services = readServicesFile();
  services.push(newService);
  writeServicesFile(services);

  res.status(201).json(newService);
};

exports.getServiceById = (req, res) => {
  const services = readServicesFile();
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
};

exports.updateService = (req, res) => {
  const services = readServicesFile();
  const index = services.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Service not found' });

  const updated = {
    ...services[index],
    ...req.body,
    updated: new Date().toISOString()
  };
  services[index] = updated;
  writeServicesFile(services);
  res.json(updated);
};

exports.deleteService = (req, res) => {
  const services = readServicesFile();
  const filtered = services.filter(s => s.id !== req.params.id);
  if (services.length === filtered.length) {
    return res.status(404).json({ error: 'Service not found' });
  }
  writeServicesFile(filtered);
  res.status(204).end();
};