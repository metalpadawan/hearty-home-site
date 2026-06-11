import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta } from '../data/meta.js';

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const canonicalUrl = new URL(meta.path, 'https://hearty-home-site.vercel.app').toString();

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', meta.image);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
  }, [pathname]);

  return null;
}
