const siteUrl = 'https://hearty-home-site.vercel.app';
const image = `${siteUrl}/assets/images/logo-emblem.png`;

export const defaultMeta = {
  title: 'Hearty Home Solutions | Thoughtful Support in Chester',
  description: 'Compassionate, reliable home, personal, property, and business solutions across Chester and surrounding areas.',
  path: '/',
  image,
};

export const routeMeta = {
  '/': defaultMeta,
  '/about': {
    title: 'About Hearty Home Solutions',
    description: 'Learn more about Hearty Home Solutions, a warm and reliable service for thoughtful support across Chester and surrounding areas.',
    path: '/about',
    image,
  },
  '/contact': {
    title: 'Contact Hearty Home Solutions',
    description: 'Contact Hearty Home Solutions to discuss the support you need across Chester and surrounding areas.',
    path: '/contact',
    image,
  },
};

export function getRouteMeta(pathname) {
  if (pathname === '/about.html') return routeMeta['/about'];
  if (pathname === '/contact.html') return routeMeta['/contact'];
  return routeMeta[pathname] || defaultMeta;
}
