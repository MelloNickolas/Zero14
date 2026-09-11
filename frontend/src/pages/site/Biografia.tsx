import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/site/Footer';
import IntegranteApi from '../../services/integranteApi';
import ConfiguracaoApi from '../../services/configuracaoApi';
import type { Integrante } from '../../services/types';
import JsonLdBreadcrumb from '../../components/site/JsonLdBreadcrumb';
import Seo from '../../components/site/Seo';

const REDES = (
  <div className="flex gap-3.5 max-md:justify-center">
    <a href="https://www.instagram.com/grupozero14/" target="_blank" rel="noopener" aria-label="Instagram" className="flex h-12 w-12 -rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-white text-tinta shadow-[4px_4px_0_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:rotate-0 hover:bg-tinta hover:text-white">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[23px] w-[23px]"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.17-.4-.36-1-.42-2.2-.06-1.3-.07-1.7-.07-4.9s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.3-.28.8-.32 1.7C4 8.5 4 8.9 4 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.31.32.62.52 1.05.7.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.31.52-.62.7-1.05.12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7a2.8 2.8 0 0 0-.7-1.06 2.8 2.8 0 0 0-1.05-.7c-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" /></svg>
    </a>
    <a href="#" aria-label="TikTok" className="flex h-12 w-12 rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-white text-tinta shadow-[4px_4px_0_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:rotate-0 hover:bg-tinta hover:text-white">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[23px] w-[23px]"><path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.3-.3-3.5-1v6.1c0 3.6-2.6 5.9-5.7 5.9A5.7 5.7 0 0 1 5 14.4c0-3.4 2.9-5.7 6.2-5.3v2.6c-.4-.1-.9-.2-1.3-.2-1.5 0-2.6 1.1-2.6 2.7 0 1.6 1.1 2.7 2.6 2.7 1.6 0 2.7-1.2 2.7-2.9V3h1.9Z" /></svg>
    </a>
    <a href="#" aria-label="YouTube" className="flex h-12 w-12 -rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-white text-tinta shadow-[4px_4px_0_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:rotate-0 hover:bg-tinta hover:text-white">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[23px] w-[23px]"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4a2.5 2.5 0 0 0-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7c.4-1.5.4-4.7.4-4.7ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z" /></svg>
    </a>
  </div>
);

export default function Biografia() {
  const [solido, setSolido] = useState(false);
  const [texto, setTexto] = useState('');
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [bioAberto, setBioAberto] = useState(false);
  const [depoIdx, setDepoIdx] = useState(0);
  const [trocando, setTrocando] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    IntegranteApi.listar().then(setIntegrantes).catch(() => {}).finally(() => setCarregado(true));
    ConfiguracaoApi.obter().then((c) => { if (c?.biografiaTexto?.trim()) setTexto(c.biografiaTexto); }).catch(() => {});
  }, []);

  const depoimentos = integrantes.filter((i) => i.depoimento?.trim());

  useEffect(() => {
    if (depoimentos.length < 2) return;
    const t = setInterval(() => {
      setTrocando(true);
      setTimeout(() => { setDepoIdx((v) => (v + 1) % depoimentos.length); setTrocando(false); }, 350);
    }, 5000);
    return () => clearInterval(t);
  }, [depoimentos.length]);

  const depo = depoimentos[depoIdx] ?? depoimentos[0];

  return (
    <div className="bg-azul">
      <Seo title="Biografia — Grupo Zero 14" description="Conheça a história e os integrantes do Grupo Zero 14, um dos grupos de pagode que mais cresce na região." path="/biografia" />
      <JsonLdBreadcrumb itens={[{ nome: 'Início', url: 'https://grupozero14.com.br' }, { nome: 'Biografia', url: 'https://grupozero14.com.br/biografia' }]} />
      {/* ===== TOPBAR ===== */}
      <header className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-3.5 transition-all ${solido ? 'bg-white shadow-[0_1px_12px_rgba(0,0,0,.1)]' : 'bg-transparent'}`}>
        <Link to="/" aria-label="Grupo Zero 14 - início"><img src={solido ? '/assets/logo-preta-nav.png' : '/assets/logo-branca-nav.png'} alt="Grupo Zero 14" className="h-[42px] w-auto" /></Link>
        <Link to="/" className={`inline-flex items-center gap-2 rounded-[12px_18px_12px_16px] border-2 px-[18px] py-2.5 text-sm font-semibold transition hover:border-amarelo hover:bg-amarelo hover:text-tinta ${solido ? 'border-tinta/25 text-tinta' : 'border-white/35 text-white'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Voltar ao site
        </Link>
      </header>

      {/* ===== BIOGRAFIA (imagem + texto) ===== */}
      <main className="relative">
        <picture>
          <source media="(max-width:549px)" srcSet="/assets/biografia-assets/Biografia-Small.webp" />
          <source media="(max-width:760px)" srcSet="/assets/biografia-assets/Biografia-Mobile.webp" />
          <source media="(max-width:1024px)" srcSet="/assets/biografia-assets/Biografia-Tablet.webp" />
          <img src="/assets/biografia-assets/Biografia-Desktop.webp" alt="Grupo Zero 14" className="block w-full" />
        </picture>

        <div className="flex flex-col bg-azul px-6 py-11 text-white [background:#1E27EB_url('/assets/bg-blue-texture.jpg')_center/cover] md:absolute md:inset-y-0 md:right-0 md:h-full md:w-2/5 md:min-w-[360px] md:px-[clamp(30px,4vw,64px)] md:py-[20vh]">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Conheça o grupo</span>
          <h1 className="mt-1.5 font-display text-[clamp(48px,7vw,92px)] uppercase leading-none">Biografia</h1>
          <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mb-6 mt-2.5 block h-3.5 w-[210px]"><path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#E12E27" strokeWidth="4.5" strokeLinecap="round" /></svg>

          {texto.trim() ? (
            <>
              <div className={`space-y-4 leading-[1.8] text-white/92 transition-all ${bioAberto ? 'md:max-h-[46vh] md:overflow-y-auto' : 'max-h-[9em] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_62%,transparent)]'}`}>
                {texto.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <button onClick={() => setBioAberto((v) => !v)} className="mt-3.5 w-max -rotate-[1.5deg] rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-amarelo px-[22px] py-1.5 font-display text-[17px] uppercase text-tinta shadow-[4px_4px_0_rgba(0,0,0,.35)] transition hover:rotate-0 hover:-translate-y-0.5">
                {bioAberto ? 'Ver menos' : 'Ver mais'}
              </button>
            </>
          ) : (
            <p className="font-mao text-xl text-white/80">Em breve a história do grupo por aqui.</p>
          )}

          <div className="mt-auto pt-6">
            <span className="mb-3 block font-display text-lg uppercase">Nos siga nas redes</span>
            {REDES}
          </div>
        </div>
      </main>

      {/* ===== INTEGRANTES ===== */}
      <section id="integrantes" className="textura-giz relative overflow-hidden bg-white pb-[102px] pt-[150px]">
        <div className="pointer-events-none absolute inset-x-[-8%] top-1/2 z-0 -translate-y-1/2 -rotate-[4deg] overflow-hidden py-[18px] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="pr-10 font-display text-[clamp(40px,6.5vw,78px)] italic uppercase leading-none tracking-[2px]" style={i % 2 ? { color: 'transparent', WebkitTextStroke: '2.4px var(--color-azul)' } : { color: 'var(--color-azul)' }}>Integrantes •</span>
            ))}
          </div>
        </div>

        {integrantes.length === 0 ? (
          carregado ? (
            <div className="relative z-[1] mx-auto max-w-[520px] rotate-[-.6deg] rounded-[26px_18px_26px_18px] border-[3px] border-dashed border-tinta/40 bg-[#fffdf7] p-12 text-center shadow-[6px_6px_0_rgba(20,23,28,.12)]">
              <div className="font-display text-[clamp(30px,6vw,48px)] uppercase leading-none text-azul">Em breve</div>
              <p className="mt-3 font-mao text-xl text-neutral-600">Os integrantes do grupo vão aparecer aqui!</p>
            </div>
          ) : null
        ) : (
        <div className="relative z-[1] mx-auto grid max-w-[1160px] grid-cols-1 gap-[26px] px-6 min-[460px]:grid-cols-2 min-[860px]:grid-cols-4">
          {integrantes.map((m, i) => (
            <div key={m.id} className={`group rounded-[18px_28px_18px_26px] border-[3px] border-tinta bg-white p-[12px_12px_22px] text-center shadow-[6px_6px_0_var(--color-tinta)] transition hover:-translate-y-1.5 hover:!rotate-0 hover:shadow-[9px_9px_0_var(--color-tinta)] ${i % 2 ? 'rotate-[1.3deg]' : 'rotate-[-1.3deg]'}`}>
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#e9e9ee]">
                <img src={m.fotoUrl} alt={m.nome} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-3.5 font-display text-2xl uppercase leading-none text-azul">{m.nome}</div>
              <span className="mt-2 inline-block rounded-[8px_12px_8px_10px] bg-azul px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">{m.papel}</span>
              <p className="mt-3 px-1 text-[13px] leading-relaxed text-[#5b5b68]">{m.descricao}</p>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      {depo && (
        <section className="bg-white px-6 pb-24 pt-[30px]">
          <div className="relative mx-auto max-w-[760px] rounded-[28px_44px_28px_40px] border-[3px] border-tinta bg-white p-[56px_8%_74px] text-center text-tinta shadow-[8px_8px_0_var(--color-tinta)]">
            <span className="pointer-events-none absolute left-6 top-0.5 font-display text-[96px] leading-none text-azul/15" aria-hidden="true">&ldquo;</span>
            <p className={`font-mao text-[clamp(20px,2.4vw,27px)] leading-relaxed transition-opacity duration-300 ${trocando ? 'opacity-0' : 'opacity-100'}`}>"{depo.depoimento}"</p>
            <div className={`mt-4 font-bold text-azul transition-opacity duration-300 ${trocando ? 'opacity-0' : 'opacity-100'}`}>— {depo.nome}</div>
            <div className="absolute -bottom-[42px] left-1/2 h-[84px] w-[84px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-[#e9e9ee] shadow-[0_8px_22px_rgba(0,0,0,.28)]">
              <img src={depo.fotoUrl} alt={depo.nome} className={`h-full w-full object-cover object-top transition-opacity duration-300 ${trocando ? 'opacity-0' : 'opacity-100'}`} />
            </div>
          </div>
          {depoimentos.length > 1 && (
            <div className="mt-16 flex justify-center gap-2.5">
              {depoimentos.map((_, i) => (
                <button key={i} onClick={() => setDepoIdx(i)} aria-label={`Depoimento ${i + 1}`} className={`h-3 w-3 rounded-full border-2 border-tinta transition ${i === depoIdx ? 'scale-110 border-azul bg-azul' : 'bg-transparent'}`} />
              ))}
            </div>
          )}
        </section>
      )}

      <Footer />
    </div>
  );
}
