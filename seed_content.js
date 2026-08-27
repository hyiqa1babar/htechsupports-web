const fs = require('fs');
const path = require('path');

const siteData = JSON.parse(fs.readFileSync(path.join(__dirname, 'client', 'src', 'data', 'siteData.json'), 'utf8'));

// 1. Build Services & Sub-services array
const servicesList = [];

(siteData.services || []).forEach(s => {
  const detail = siteData.detailPages?.[s.id] || {};
  servicesList.push({
    id: s.id,
    slug: s.id,
    title: s.title,
    icon: s.icon || 'Server',
    badge: s.badge || '',
    tagline: detail.tagline || s.title,
    description: s.description || detail.description || '',
    content: detail.description || s.description || '',
    features: detail.features || [],
    caseStudy: detail.caseStudy || '',
    image_url: s.image || detail.image || '/assets/images/service-network-support.png',
    link: s.link || `/pages/${s.id}`,
    category: 'Core Service',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  });
});

(siteData.sectors || []).forEach(s => {
  const detail = siteData.detailPages?.[s.id] || {};
  servicesList.push({
    id: s.id,
    slug: s.id,
    title: s.title,
    icon: s.icon || 'Building',
    badge: 'Industry Sector',
    tagline: detail.tagline || `${s.title} Sector Infrastructure`,
    description: s.description || detail.description || '',
    content: detail.description || s.description || '',
    features: detail.features || [],
    caseStudy: detail.caseStudy || '',
    image_url: s.image || detail.image || '/assets/images/sector-retail.png',
    link: s.link || `/pages/${s.id}`,
    category: 'Sector',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  });
});

// Write to server/content/services.json
const serverServicesFile = path.join(__dirname, 'server', 'content', 'services.json');
fs.writeFileSync(serverServicesFile, JSON.stringify(servicesList, null, 2), 'utf8');
console.log(`Wrote ${servicesList.length} services & sectors to ${serverServicesFile}`);

// 2. Build Pages list (Main pages + detail sub-pages)
const pagesList = [
  {
    id: 'home',
    slug: 'home',
    title: 'Home Page',
    path: '/',
    tagline: siteData.company?.tagline || 'Everything you need. Global IT Support & Infrastructure Services.',
    content: siteData.company?.details || siteData.company?.description || '',
    image_url: '/assets/images/hero-startup-1.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'company',
    slug: 'company',
    title: 'Company & About Us',
    path: '/company',
    tagline: 'Your Global Partner for Critical IT Deployments',
    content: siteData.company?.details || '',
    image_url: '/assets/images/company-hero.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'services',
    slug: 'services',
    title: 'Services Overview',
    path: '/services',
    tagline: 'End-to-End IT Infrastructure & Engineering Capabilities',
    content: 'Comprehensive IT services spanning professional AV, Ekahau Wi-Fi surveys, 24/7 network support, structured cabling, deskside EUC support, ITAD, and global engineer staff augmentation.',
    image_url: '/assets/images/service-network-support.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'sectors',
    slug: 'sectors',
    title: 'Industry Sectors',
    path: '/sectors',
    tagline: 'Cross-Industry Engineering Delivery Across 50+ Countries',
    content: 'Delivering tailored IT rollouts across retail estates, enterprise headquarters, hyperscale data centers, carrier networks, manufacturing plants, and government facilities.',
    image_url: '/assets/images/sector-retail.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'engineer',
    slug: 'engineer',
    title: 'Enter the Hub (Engineer Portal)',
    path: '/engineer',
    tagline: 'Your Command Centre for Global Deployments. Mobile Dispatch & Field Hub.',
    content: 'The official engineer portal for active field technicians and approved partners. Access real-time dispatch, job packs, Ekahau certifications, evidence sign-off, and travel tools directly via mobile apps.',
    image_url: '/assets/images/service-structured-cabling.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'careers',
    slug: 'careers',
    title: 'Careers & Field Opportunities',
    path: '/careers',
    tagline: 'Global Deployment Engine Built for Engineers',
    content: 'Join our worldwide network of field engineers, network specialists, and datacenter technicians. Explore disciplines and submit your CV.',
    image_url: '/assets/images/company-services.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact Us',
    path: '/contact',
    tagline: "Let's Talk About Your IT Needs",
    content: 'Reach our global offices in the UK, France, and USA for project scoping, emergency dispatch, and partnership inquiries.',
    image_url: '/assets/images/company-mission.png',
    category: 'Main Page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'terms',
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    path: '/terms-and-conditions',
    tagline: 'Terms of Service & Engagement Policies',
    content: 'Standard contractual terms and conditions for HTech Supports global engineering and infrastructure services.',
    image_url: '/assets/images/company-hero.png',
    category: 'Legal',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    path: '/privacy-policy',
    tagline: 'Data Protection & Privacy Notice',
    content: 'Comprehensive privacy policy and GDPR compliance statement regarding data processing at HTech Supports.',
    image_url: '/assets/images/company-hero.png',
    category: 'Legal',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  }
];

// Add all sub-pages
Object.entries(siteData.detailPages || {}).forEach(([slug, detail]) => {
  pagesList.push({
    id: `detail-${slug}`,
    slug: slug,
    title: detail.title || slug,
    path: `/pages/${slug}`,
    tagline: detail.tagline || '',
    content: detail.description || '',
    features: detail.features || [],
    caseStudy: detail.caseStudy || '',
    image_url: detail.image || '/assets/images/service-network-support.png',
    category: detail.kind === 'sector' ? 'Sector Sub-page' : 'Service Sub-page',
    status: 'published',
    created: new Date('2024-06-01').toISOString(),
    updated: new Date().toISOString()
  });
});

const serverPagesFile = path.join(__dirname, 'server', 'content', 'pages.json');
fs.writeFileSync(serverPagesFile, JSON.stringify(pagesList, null, 2), 'utf8');
console.log(`Wrote ${pagesList.length} pages & sub-pages to ${serverPagesFile}`);
