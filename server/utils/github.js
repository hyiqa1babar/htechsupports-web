const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

const OWNER = process.env.GITHUB_REPO_OWNER || 'hyiqa1babar';
const REPO = process.env.GITHUB_REPO_NAME || 'htechsupports-web';
const DEFAULT_BRANCH = process.env.GITHUB_BRANCH || 'dev';

function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  return new Octokit({ auth: token });
}

// Helper to create an atomic commit that adds/updates multiple files in one commit
// files: [{ path: 'server/content/uploads/xxx.png', content: <Buffer> | string (utf8) }]
async function commitFilesAtomic(files, message, branch = DEFAULT_BRANCH) {
  const octokit = getOctokit();
  if (!octokit) throw new Error('GITHUB_TOKEN not configured');

  // 1. Get the reference for the branch
  const ref = `heads/${branch}`;
  const { data: refData } = await octokit.rest.git.getRef({ owner: OWNER, repo: REPO, ref });
  const commitSha = refData.object.sha;

  // 2. Get the full commit object to obtain tree
  const { data: commitData } = await octokit.rest.git.getCommit({ owner: OWNER, repo: REPO, commit_sha: commitSha });
  const baseTreeSha = commitData.tree.sha;

  // 3. Create blobs for each file
  const blobPromises = files.map(async (f) => {
    const content = Buffer.isBuffer(f.content) ? f.content.toString('base64') : Buffer.from(String(f.content)).toString('base64');
    const blob = await octokit.rest.git.createBlob({ owner: OWNER, repo: REPO, content, encoding: 'base64' });
    return { path: f.path, sha: blob.data.sha, mode: '100644', type: 'blob' };
  });
  const blobs = await Promise.all(blobPromises);

  // 4. Create a new tree using the blobs
  // Map blobs to tree entries
  const tree = blobs.map(b => ({ path: b.path, mode: b.mode, type: b.type, sha: b.sha }));

  const { data: newTree } = await octokit.rest.git.createTree({ owner: OWNER, repo: REPO, tree, base_tree: baseTreeSha });

  // 5. Create a new commit
  const { data: newCommit } = await octokit.rest.git.createCommit({ owner: OWNER, repo: REPO, message, tree: newTree.sha, parents: [commitSha] });

  // 6. Update the reference to point to new commit
  await octokit.rest.git.updateRef({ owner: OWNER, repo: REPO, ref, sha: newCommit.sha });

  return { commitSha: newCommit.sha };
}

// Helper to read a file from the repo (returns { content, sha })
async function readFileFromRepo(filePath, branch = DEFAULT_BRANCH) {
  const octokit = getOctokit();
  if (!octokit) throw new Error('GITHUB_TOKEN not configured');
  const res = await octokit.rest.repos.getContent({ owner: OWNER, repo: REPO, path: filePath, ref: branch });
  if (Array.isArray(res.data)) throw new Error('Expected file but found directory');
  const content = Buffer.from(res.data.content, res.data.encoding).toString('utf8');
  return { content, sha: res.data.sha };
}

module.exports = { commitFilesAtomic, readFileFromRepo, getOctokit };
