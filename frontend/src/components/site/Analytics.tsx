import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const STORAGE_KEY = 'zero14-cookie-consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let gaCarregado = false;
function carregarGA(id: string) {
  if (gaCarregado) return;
  gaCarregado = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // page_view é enviado manualmente a cada rota (SPA)
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true });
}

// Banner de consentimento (LGPD) + Google Analytics 4 (só carrega após aceitar).
export default function Analytics() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  // carrega o GA quando o usuário já aceitou
  useEffect(() => {
    if (GA_ID && consent === 'accepted') carregarGA(GA_ID);
  }, [consent]);

  // envia page_view a cada troca de rota (após consentimento)
  useEffect(() => {
    if (GA_ID && consent === 'accepted' && window.gtag) {
      window.gtag('event', 'page_view', { page_path: pathname });
    }
  }, [pathname, consent]);

  function decidir(valor: 'accepted' | 'rejected') {
    try { localStorage.setItem(STORAGE_KEY, valor); } catch { /* ignore */ }
    setConsent(valor);
  }

  // sem GA configurado, ou já decidiu, ou no painel admin → não mostra banner
  if (!GA_ID || consent || pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[95] w-[min(460px,calc(100%-2rem))] -translate-x-1/2 rotate-[-.4deg] rounded-[16px_22px_16px_20px] border-[3px] border-tinta bg-white p-4 text-tinta shadow-[6px_6px_0_var(--color-tinta)] sm:p-5">
      <p className="text-[13.5px] leading-relaxed">
        Usamos cookies do <strong>Google Analytics</strong> pra entender como o site é usado e melhorar sua experiência.
        Veja a <a href="/politica-de-privacidade" className="font-semibold text-azul hover:underline">Política de Privacidade</a>.
      </p>
      <div className="mt-3.5 flex gap-2.5">
        <button onClick={() => decidir('accepted')} className="flex-1 rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-azul px-4 py-2 font-display text-sm uppercase text-white shadow-[3px_3px_0_var(--color-tinta)] transition hover:-translate-y-0.5">Aceitar</button>
        <button onClick={() => decidir('rejected')} className="rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-white px-4 py-2 font-display text-sm uppercase text-tinta transition hover:-translate-y-0.5 hover:bg-creme">Recusar</button>
      </div>
    </div>
  );
}
