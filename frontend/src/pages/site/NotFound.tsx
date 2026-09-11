import { Link } from 'react-router-dom';
import Seo from '../../components/site/Seo';

export default function NotFound() {
  return (
    <div className="textura-giz relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-azul px-6 py-16 text-center text-white">
      <Seo title="Página não encontrada — Grupo Zero 14" description="Essa página não existe. Volte para o início do site do Grupo Zero 14." noIndex />
      {/* logo topo */}
      <Link to="/" aria-label="Grupo Zero 14 - início" className="absolute left-6 top-6 z-[2]">
        <img src="/assets/logo-branca-nav.png" alt="Grupo Zero 14" className="h-10 w-auto md:h-12" />
      </Link>

      {/* notas musicais flutuando */}
      <svg aria-hidden="true" className="flutua pointer-events-none absolute left-[10%] top-[22%] hidden h-10 w-10 text-amarelo md:block [--giro:-12deg]" style={{ animationDelay: '.2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M9 17.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V4l10-2v9.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V6L9 7.2v10.3z" /></svg>
      <svg aria-hidden="true" className="flutua pointer-events-none absolute right-[12%] top-[26%] hidden h-8 w-8 text-white/70 md:block [--giro:10deg]" style={{ animationDelay: '1.1s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.3L21 9l-5 4.2L17.6 20 12 16.3 6.4 20 8 13.2 3 9l6.6-.7z" /></svg>
      <svg aria-hidden="true" className="flutua pointer-events-none absolute bottom-[16%] right-[16%] hidden h-9 w-9 text-amarelo md:block [--giro:8deg]" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M9 17.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V4l10-2v9.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V6L9 7.2v10.3z" /></svg>

      <div className="relative z-[1] flex max-w-[640px] flex-col items-center">
        <div className="flutua font-display text-[clamp(96px,26vw,240px)] leading-[.85] text-white [text-shadow:6px_6px_0_var(--color-tinta),0_0_60px_rgba(245,197,24,.25)]">
          4<span className="text-amarelo">0</span>4
        </div>

        <span className="entra-item mt-2 text-xs font-semibold uppercase tracking-[3px] text-amarelo" style={{ animationDelay: '.1s' }}>Opa, cadê essa página?</span>
        <h1 className="entra-item mt-2 font-display text-[clamp(26px,5vw,44px)] uppercase leading-[.95]" style={{ animationDelay: '.2s' }}>
          Essa página foi pro pagode<br className="hidden sm:block" /> e não voltou
        </h1>
        <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="entra-item mt-3 block h-3.5 w-[min(260px,70%)]" style={{ animationDelay: '.3s' }}><path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#F5C518" strokeWidth="5" strokeLinecap="round" /></svg>

        <p className="entra-item mt-4 max-w-[440px] text-[16px] leading-relaxed text-white/85" style={{ animationDelay: '.4s' }}>
          O link que você tentou não existe (ou saiu pra tocar em outro canto). Bora voltar pra festa?
        </p>

        <div className="entra-item mt-8 flex flex-col items-center gap-3.5 sm:flex-row" style={{ animationDelay: '.5s' }}>
          <Link to="/" className="group inline-flex items-center gap-2.5 -rotate-1 rounded-[16px_26px_16px_22px] border-[3px] border-tinta bg-amarelo px-8 py-3.5 font-display text-lg uppercase text-tinta shadow-[6px_6px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5 hover:bg-[#ffd43b]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Voltar pro início
          </Link>
          <Link to="/shows" className="inline-flex items-center gap-2 rotate-1 rounded-[16px_22px_16px_20px] border-[3px] border-white/70 px-7 py-3.5 font-display text-lg uppercase text-white transition hover:rotate-0 hover:-translate-y-0.5 hover:border-white hover:bg-white/10">
            Ver a agenda
          </Link>
        </div>
      </div>
    </div>
  );
}
