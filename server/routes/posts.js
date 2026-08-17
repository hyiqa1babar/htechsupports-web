// server/routes/posts.js
// ---------------------------------------------------------------
// REST routes for posts - now support CREATE and UPDATE
// ---------------------------------------------------------------

const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postsController');

// READ - GET /api/posts
router.get('/', postsCtrl.getPosts);

// CREATE - POST /api/posts
router.post('/', postsCtrl.createPost);

// READ SINGLE - GET /api/posts/:id
router.get('/:id', postsCtrl.getPostById);

// UPDATE - PUT /api/posts/:id
router.put('/:id', postsCtrl.updatePost);

// DELETE - DELETE /api/posts/:id
router.delete('/:id', postsCtrl.deletePost);

module.exports = router;