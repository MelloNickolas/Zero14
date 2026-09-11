import { useEffect } from 'react';

type Item = { nome: string; url: string };

// Injeta um BreadcrumbList (schema.org) no <head> — invisível, só pra SEO.
// O Google pode exibir a trilha (ex: grupozero14.com.br › Shows) nos resultados.
export default function JsonLdBreadcrumb({ itens }: { itens: Item[] }) {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itens.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.nome,
        item: it.url,
      })),
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(itens)]);

  return null;
}
