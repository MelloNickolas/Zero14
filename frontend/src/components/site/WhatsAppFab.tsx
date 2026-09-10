import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfiguracaoApi from '../../services/configuracaoApi';

const MENSAGEM = 'Olá! Vim pelo site da Zero14 e gostaria de contratar o serviço de vocês, como podemos negociar?';

// Botão flutuante fixo (canto inferior direito). Parado/mobile = só o ícone;
// no hover ele cresce e revela "Contrate-nos". Abre o WhatsApp com mensagem pronta.
export default function WhatsAppFab() {
  const { pathname } = useLocation();
  const [whatsApp, setWhatsApp] = useState('');

  useEffect(() => {
    ConfiguracaoApi.obter().then((c) => setWhatsApp(c.whatsApp ?? '')).catch(() => {});
  }, []);

  // não aparece no painel administrativo
  if (pathname.startsWith('/admin')) return null;

  const numero = whatsApp.replace(/\D/g, '');
  const numeroFinal = numero && !numero.startsWith('55') ? `55${numero}` : numero;
  const href = numeroFinal ? `https://wa.me/${numeroFinal}?text=${encodeURIComponent(MENSAGEM)}` : '/#contato';

  return (
    <a
      href={href}
      target={numeroFinal ? '_blank' : undefined}
      rel={numeroFinal ? 'noopener noreferrer' : undefined}
      aria-label="Contrate-nos pelo WhatsApp"
      className="group fixed bottom-4 right-4 z-[90] flex -rotate-2 items-center md:bottom-8 md:right-8 rounded-[16px_22px_16px_20px] border-[3px] border-tinta bg-azul text-white shadow-[4px_4px_0_var(--color-tinta)] transition-all duration-300 hover:rotate-0 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-tinta)]"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[240px]">
        <span className="block pl-5 pr-1 font-display text-lg uppercase tracking-wide">Contrate-nos</span>
      </span>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.47 3.63-8.1 8.1-8.1Zm4.65 10.16c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.13-.56.13-.17.25-.65.82-.79.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.29Z" />
        </svg>
      </span>
    </a>
  );
}
