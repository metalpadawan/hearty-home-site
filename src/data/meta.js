const siteUrl = 'https://www.heartyhome.co.uk';
const image = `${siteUrl}/assets/images/logo-emblem.png`;

export const defaultMeta = {
  title: 'Hearty Home Services | Home Support Services in Chester',
  description: 'Hearty Home Services offers cleaning services and person-centred hoarders specialist support in Chester.',
  path: '/',
  image,
};

export const routeMeta = {
  '/': defaultMeta,
  '/about': {
    title: 'About Hearty Home Services',
    description: 'Learn about Hearty Home Services, from practical cleaning services to person-centred hoarders specialist support and future home services.',
    path: '/about',
    image,
  },
  '/founder': {
    title: 'Founder | Hearty Home Services',
    description: 'Meet the founder behind Hearty Home Services and learn the story, mission, vision, and goals behind its person-centred home services.',
    path: '/founder',
    image,
  },
  '/contact': {
    title: 'Contact Hearty Home Services',
    description: 'Contact Hearty Home Services to discuss cleaning services, hoarders specialist support, or future services.',
    path: '/contact',
    image,
  },
  '/privacy': {
    title: 'Privacy | Hearty Home Services',
    description: 'Privacy information for Hearty Home Services, including enquiry data, retention, deletion requests, and third-party processors.',
    path: '/privacy',
    image,
  },
};

export function getRouteMeta(pathname) {
  if (pathname === '/about.html') return routeMeta['/about'];
  if (pathname === '/founder.html') return routeMeta['/founder'];
  if (pathname === '/contact.html') return routeMeta['/contact'];
  if (pathname === '/privacy.html') return routeMeta['/privacy'];
  return routeMeta[pathname] || defaultMeta;
}
