import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FotoApi from '../../services/fotoApi';

const FOTOS_EXEMPLO = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'].map((g) => `/assets/galeria/web/${g}.jpg`);

export default function Galeria() {
  const [fotos, setFotos] = useState<string[]>(FOTOS_EXEMPLO);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    FotoApi.listar().then((f) => { if (f.length) setFotos(f.map((x) => x.url)); }).catch(() => {});
  }, []);

  const fechar = useCallback(() => setLb(null), []);
  const ir = useCallback((d: number) => setLb((v) => (v === null ? v : (v + d + fotos.length) % fotos.length)), [fotos.length]);

  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') ir(-1);
      if (e.key === 'ArrowRight') ir(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lb, fechar, ir]);

  return (
    <div className="textura-giz relative min-h-dvh overflow-hidden bg-[#0b0b0d] text-white">
      {/* ===== TOPBAR ===== */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0b0b0d]/90 px-6 py-4 backdrop-blur">
        <Link to="/" aria-label="Grupo Zero 14 - início"><img src="/assets/logo-branca-nav.png" alt="Grupo Zero 14" className="h-[42px] w-auto" /></Link>
        <Link to="/" className="inline-flex items-center gap-2 rounded-[12px_18px_12px_16px] border-2 border-white/30 px-[18px] py-2.5 text-sm font-semibold text-white transition hover:border-amarelo hover:bg-amarelo hover:text-tinta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Voltar ao site
        </Link>
      </header>

      <div className="relative z-[1] mx-auto max-w-[1300px] px-6 pb-[90px] pt-[60px]">
        <div className="mb-12 text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Momentos do grupo</span>
          <h1 className="mt-1.5 font-display text-[clamp(48px,10vw,110px)] uppercase leading-none">Galeria</h1>
          <p className="mt-3 text-white/70">Registros dos shows, bastidores e da resenha do Zero 14.</p>
        </div>

        {/* masonry */}
        <div className="columns-1 gap-[22px] min-[480px]:columns-2 min-[760px]:columns-3 min-[1100px]:columns-4">
          {fotos.map((url, i) => (
            <figure
              key={i}
              onClick={() => setLb(i)}
              className={`relative mb-6 block cursor-pointer break-inside-avoid overflow-hidden rounded-[8px_14px_8px_12px] border-4 border-[#f5f2e9] shadow-[0_14px_30px_rgba(0,0,0,.55)] transition-transform before:absolute before:-top-[11px] before:left-1/2 before:z-[3] before:h-[22px] before:w-[72px] before:-translate-x-1/2 before:border before:border-dashed before:border-black/20 hover:z-[2] hover:!rotate-0 hover:scale-[1.02] ${
                i % 2 ? 'rotate-[1.4deg] before:rotate-[5deg] before:bg-azul/35' : 'rotate-[-1.4deg] before:-rotate-[4deg] before:bg-amarelo/50'
              }`}
            >
              <img src={url} alt={`Grupo Zero 14 - foto ${i + 1}`} className="block w-full" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lb !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060608]/95 p-10" onClick={fechar}>
          <button onClick={fechar} aria-label="Fechar" className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white text-2xl leading-none hover:border-vermelho hover:bg-vermelho">×</button>
          <button onClick={(e) => { e.stopPropagation(); ir(-1); }} aria-label="Anterior" className="absolute left-5 top-1/2 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-black/40 hover:border-amarelo hover:bg-amarelo hover:text-tinta">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img src={fotos[lb]} alt="" className="max-h-[86vh] max-w-[92vw] rounded-md border-4 border-[#f5f2e9] shadow-[0_20px_60px_rgba(0,0,0,.6)]" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); ir(1); }} aria-label="Próxima" className="absolute right-5 top-1/2 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-black/40 hover:border-amarelo hover:bg-amarelo hover:text-tinta">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
