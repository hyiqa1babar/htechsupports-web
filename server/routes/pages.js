// server/routes/pages.js
// REST routes for pages

const express = require('express');
const router = express.Router();

const pagesCtrl = require('../controllers/pagesController');

// READ - GET /api/pages
router.get('/', pagesCtrl.getPages);

// CREATE - POST /api/pages
router.post('/', pagesCtrl.createPage);

// READ SINGLE - GET /api/pages/:id
router.get('/:id', pagesCtrl.getPageById);

// UPDATE - PUT /api/pages/:id
router.put('/:id', pagesCtrl.updatePage);

// DELETE - DELETE /api/pages/:id
router.delete('/:id', pagesCtrl.deletePage);

module.exports = router;