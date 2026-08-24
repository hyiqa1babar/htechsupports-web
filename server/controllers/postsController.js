// server/controllers/postsController.js
const fs = require('fs');
const path = require('path');
const { commitFilesAtomic, readFileFromRepo, getOctokit } = require('../utils/github');

const DATA_DIR = path.join(__dirname, '..', 'content');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const REPO_PATH = 'server/content/posts.json';

function readPostsFile() {
  try { return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8')); }
  catch (_) { return []; }
}

function writePostsFile(data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));
}

async function readPostsFromRepo() {
  try {
    const { content } = await readFileFromRepo(REPO_PATH);
    return JSON.parse(content);
  } catch (_) { return []; }
}

exports.getPosts = (req, res) => {
  res.json(readPostsFile());
};

exports.getPostById = (req, res) => {
  const post = readPostsFile().find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.createPost = async (req, res) => {
  try {
    const newPost = {
      ...req.body,
      id: Date.now().toString(),
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    if (getOctokit()) {
      const posts = await readPostsFromRepo();
      posts.push(newPost);
      await commitFilesAtomic(
        [{ path: REPO_PATH, content: JSON.stringify(posts, null, 2) }],
        `admin: add post "${newPost.title}"`
      );
    } else {
      const posts = readPostsFile();
      posts.push(newPost);
      writePostsFile(posts);
    }

    res.status(201).json(newPost);
  } catch (err) {
    console.error('createPost error', err);
    res.status(500).json({ error: err.message || 'Create failed' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    if (getOctokit()) {
      const posts = await readPostsFromRepo();
      const idx = posts.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Post not found' });
      const updated = { ...posts[idx], ...req.body, updated: new Date().toISOString() };
      posts[idx] = updated;
      await commitFilesAtomic(
        [{ path: REPO_PATH, content: JSON.stringify(posts, null, 2) }],
        `admin: update post "${updated.title}"`
      );
      res.json(updated);
    } else {
      const posts = readPostsFile();
      const idx = posts.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Post not found' });
      const updated = { ...posts[idx], ...req.body, updated: new Date().toISOString() };
      posts[idx] = updated;
      writePostsFile(posts);
      res.json(updated);
    }
  } catch (err) {
    console.error('updatePost error', err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (getOctokit()) {
      const posts = await readPostsFromRepo();
      const filtered = posts.filter(p => p.id !== req.params.id);
      if (posts.length === filtered.length) return res.status(404).json({ error: 'Post not found' });
      await commitFilesAtomic(
        [{ path: REPO_PATH, content: JSON.stringify(filtered, null, 2) }],
        `admin: delete post id=${req.params.id}`
      );
      res.status(204).end();
    } else {
      const posts = readPostsFile();
      const filtered = posts.filter(p => p.id !== req.params.id);
      if (posts.length === filtered.length) return res.status(404).json({ error: 'Post not found' });
      writePostsFile(filtered);
      res.status(204).end();
    }
  } catch (err) {
    console.error('deletePost error', err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
};