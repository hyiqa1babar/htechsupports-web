const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const pagesCtrl = require('../controllers/pagesController');

// READ - GET /api/pages
router.get('/', pagesCtrl.getPages);

// CREATE - POST /api/pages (supports multipart with image)
router.post('/', upload.single('image'), pagesCtrl.createPage);

// READ SINGLE - GET /api/pages/:id
router.get('/:id', pagesCtrl.getPageById);

// UPDATE - PUT /api/pages/:id (supports multipart with image)
router.put('/:id', upload.single('image'), pagesCtrl.updatePage);

// DELETE - DELETE /api/pages/:id
router.delete('/:id', pagesCtrl.deletePage);

module.exports = router;
