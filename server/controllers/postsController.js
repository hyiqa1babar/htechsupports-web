// server/controllers/postsController.js
// ---------------------------------------------------------------
// All CRUD operations for posts using file-based JSON storage
// Data stored in: server/content/posts.json
// ---------------------------------------------------------------

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'content');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// Helper - read posts from JSON file
function readPostsFile() {
  try {
    const raw = fs.readFileSync(POSTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

// Helper - write posts to JSON file
function writePostsFile(data) {
  // Ensure directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));
}

// Helper - generate unique ID
function nextId() {
  return Date.now().toString();
}

/**
 * GET /api/posts - Get all posts
 */
exports.getPosts = (req, res) => {
  const posts = readPostsFile();
  res.json(posts);
};

/**
 * POST /api/posts - Create new post
 */
exports.createPost = (req, res) => {
  const newPost = {
    ...req.body,
    id: nextId(),
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };

  const posts = readPostsFile();
  posts.push(newPost);
  writePostsFile(posts);

  res.status(201).json(newPost);
};

/**
 * GET /api/posts/:id - Get single post
 */
exports.getPostById = (req, res) => {
  const posts = readPostsFile();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

/**
 * PUT /api/posts/:id - Update post
 */
exports.updatePost = (req, res) => {
  const posts = readPostsFile();
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  const updated = {
    ...posts[index],
    ...req.body,
    updated: new Date().toISOString()
  };
  posts[index] = updated;
  writePostsFile(posts);
  res.json(updated);
};

/**
 * DELETE /api/posts/:id - Delete post
 */
exports.deletePost = (req, res) => {
  const posts = readPostsFile();
  const filtered = posts.filter(p => p.id !== req.params.id);
  if (posts.length === filtered.length) {
    return res.status(404).json({ error: 'Post not found' });
  }
  writePostsFile(filtered);
  res.status(204).end();
};