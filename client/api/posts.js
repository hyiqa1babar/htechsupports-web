const posts = [
  {
    id: '1',
    slug: 'network-optimisation',
    title: 'Network Optimisation – Case Study',
    excerpt: 'How we improved network performance for a global client.',
    date: '2024-06-12',
    category: 'Case Study',
    tags: ['Network', 'Optimization'],
    thumbnail: '/assets/posts/network_opt_placeholder_1785838438877.png',
  },
  {
    id: '2',
    slug: 'smart-hands',
    title: 'Smart Hands – Service Overview',
    excerpt: 'Our on‑site support offering for rapid issue resolution.',
    date: '2024-05-28',
    category: 'Service',
    tags: ['Support', 'On‑site'],
    thumbnail: '/assets/posts/network_opt_placeholder_1785838438877.png',
  },
  {
    id: '3',
    slug: 'cable-management',
    title: 'Cable Management Best Practices',
    excerpt: 'Tips to keep your data centre tidy and efficient.',
    date: '2024-04-15',
    category: 'Guide',
    tags: ['Cabling', 'Data Centre'],
    thumbnail: '/assets/posts/network_opt_placeholder_1785838438877.png',
  },
];

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }
  return res.status(200).json(posts);
};
