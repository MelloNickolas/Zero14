import { useEffect } from 'react';

const BASE = 'https://grupozero14.com.br';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Ajusta título + meta description + og/twitter + canonical por página (SPA).
export default function Seo({ title, description, path, noIndex }: { title: string; description: string; path?: string; noIndex?: boolean }) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    if (path !== undefined) {
      const url = `${BASE}${path}`;
      setMeta('property', 'og:url', url);
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
    }
  }, [title, description, path, noIndex]);

  return null;
}
