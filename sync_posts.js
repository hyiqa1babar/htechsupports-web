const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ');
}

function estimateReadTime(text) {
  const words = text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

async function syncPosts() {
  console.log('Fetching live posts from htechsupports.com...');
  const posts = await fetchJson('https://htechsupports.com/wp-json/wp/v2/posts?_embed&per_page=100');
  
  const formatted = posts.map((p, idx) => {
    const media = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0] : null;
    const catTerms = p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'][0] ? p._embedded['wp:term'][0] : [];
    const tagTerms = p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'][1] ? p._embedded['wp:term'][1] : [];
    
    const catName = catTerms.length > 0 ? catTerms[0].name : 'Blog';
    const tags = tagTerms.map(t => t.name);
    
    // Clean excerpt
    let rawExcerpt = p.excerpt && p.excerpt.rendered ? p.excerpt.rendered : '';
    let cleanExcerpt = decodeHtml(rawExcerpt.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...').trim());
    if (!cleanExcerpt || cleanExcerpt.length < 10) {
      const rawText = p.content.rendered.replace(/<[^>]*>/g, ' ').trim();
      cleanExcerpt = rawText.slice(0, 160) + '...';
    }

    return {
      id: String(p.id),
      slug: p.slug,
      title: decodeHtml(p.title.rendered),
      excerpt: cleanExcerpt,
      content: p.content.rendered,
      date: p.date.split('T')[0],
      category: catName,
      tags: tags,
      readTime: estimateReadTime(p.content.rendered),
      author: 'HTech Solutions Team',
      image: media ? media.source_url : '/assets/images/hero-startup-1.png',
      featured: idx === 0
    };
  });

  const clientPath = path.join(__dirname, 'client', 'src', 'data', 'postsData.json');
  fs.writeFileSync(clientPath, JSON.stringify(formatted, null, 2), 'utf-8');
  console.log(`Successfully wrote ${formatted.length} posts to ${clientPath}`);

  const serverDir = path.join(__dirname, 'server', 'content');
  if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir, { recursive: true });
  const serverPath = path.join(serverDir, 'posts.json');
  fs.writeFileSync(serverPath, JSON.stringify(formatted, null, 2), 'utf-8');
  console.log(`Successfully wrote ${formatted.length} posts to ${serverPath}`);
}

syncPosts().catch(err => {
  console.error('Error syncing posts:', err);
  process.exit(1);
});
