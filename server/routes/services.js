// server/routes/services.js
// REST routes for services

const express = require('express');
const router = express.Router();

const servicesCtrl = require('../controllers/servicesController');

// READ - GET /api/services
router.get('/', servicesCtrl.getServices);

// CREATE - POST /api/services
router.post('/', servicesCtrl.createService);

// READ SINGLE - GET /api/services/:id
router.get('/:id', servicesCtrl.getServiceById);

// UPDATE - PUT /api/services/:id
router.put('/:id', servicesCtrl.updateService);

// DELETE - DELETE /api/services/:id
router.delete('/:id', servicesCtrl.deleteService);

module.exports = router;