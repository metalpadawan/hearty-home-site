const siteUrl = 'https://hearty-home-site.vercel.app';
const image = `${siteUrl}/assets/images/logo-emblem.png`;

export const defaultMeta = {
  title: 'Hearty Home Services | Home Support Services in Chester',
  description: 'Hearty Home Services offers cleaning-led home support with plans for hoarding specialist support, home management, interior decor, property care, and business support.',
  path: '/',
  image,
};

export const routeMeta = {
  '/': defaultMeta,
  '/about': {
    title: 'About Hearty Home Services',
    description: 'Learn about the care-led approach behind Hearty Home Services, from cleaning-led support to specialist and future home services.',
    path: '/about',
    image,
  },
  '/contact': {
    title: 'Contact Hearty Home Services',
    description: 'Contact Hearty Home Services to discuss cleaning, specialist support, home management, interior decor plans, property care, or general enquiries.',
    path: '/contact',
    image,
  },
};

export function getRouteMeta(pathname) {
  if (pathname === '/about.html') return routeMeta['/about'];
  if (pathname === '/contact.html') return routeMeta['/contact'];
  return routeMeta[pathname] || defaultMeta;
}
