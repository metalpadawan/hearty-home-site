const siteUrl = 'https://hearty-home-site.vercel.app';
const image = `${siteUrl}/assets/images/logo-emblem.png`;

export const defaultMeta = {
  title: 'Hearty Home Services | Home Support Services in Chester',
  description: 'Hearty Home Services offers domestic, Airbnb, company, events, end of tenancy, add-on cleaning, and person-centred hoarding specialist support in Chester.',
  path: '/',
  image,
};

export const routeMeta = {
  '/': defaultMeta,
  '/about': {
    title: 'About Hearty Home Services',
    description: 'Learn about Hearty Home Services, from practical cleaning services to person-centred hoarding specialist support and future home services.',
    path: '/about',
    image,
  },
  '/contact': {
    title: 'Contact Hearty Home Services',
    description: 'Contact Hearty Home Services to discuss domestic, Airbnb, company, events, end of tenancy, add-on cleaning, specialist support, or future services.',
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
  if (pathname === '/contact.html') return routeMeta['/contact'];
  if (pathname === '/privacy.html') return routeMeta['/privacy'];
  return routeMeta[pathname] || defaultMeta;
}
