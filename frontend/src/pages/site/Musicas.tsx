import { useEffect, useState } from 'react';
import Navbar, { type NavItem } from '../../components/site/Navbar';
import Footer from '../../components/site/Footer';
import MusicaApi from '../../services/musicaApi';
import JsonLdBreadcrumb from '../../components/site/JsonLdBreadcrumb';
import Seo from '../../components/site/Seo';

function idYoutube(v?: string): string {
  if (!v) return '7pOh3PVH8lE';
  const m = v.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : v;
}

type Clipe = { titulo: string; sub: string; tag: string; videoId: string };
const EXEMPLO: Clipe[] = [
  { titulo: 'Love Love', sub: 'Clipe Oficial', tag: 'Clipe', videoId: '7pOh3PVH8lE' },
  { titulo: 'Piseiro do Amor', sub: 'Ao Vivo', tag: 'Ao vivo', videoId: '7pOh3PVH8lE' },
  { titulo: 'Resenha Boa', sub: 'Clipe Oficial', tag: 'Clipe', videoId: '7pOh3PVH8lE' },
  { titulo: 'Coração na Mão', sub: 'Áudio Oficial', tag: 'Pagode', videoId: '7pOh3PVH8lE' },
  { titulo: 'Volta, Amor', sub: 'Clipe Oficial', tag: 'Clipe', videoId: '7pOh3PVH8lE' },
  { titulo: 'Fim de Tarde', sub: 'Ao Vivo', tag: 'Ao vivo', videoId: '7pOh3PVH8lE' },
];

const ESQUERDA: NavItem[] = [
  { label: 'Biografia', to: '/biografia', tipo: 'route' },
  { label: 'Shows', to: '/shows', tipo: 'route' },
  { label: 'Músicas', to: '/musicas', tipo: 'route', ativo: true },
];
const DIREITA: NavItem[] = [
  { label: 'Fotos', to: '/galeria', tipo: 'route' },
  { label: 'Contato', to: '/#contato', tipo: 'anchor' },
  { label: 'Portfolio', to: '#', tipo: 'ext', configKey: 'portfolio' },
];

export default function Musicas() {
  const [clipes, setClipes] = useState<Clipe[]>(EXEMPLO);
  const [aberto, setAberto] = useState<number | null>(null);

  useEffect(() => {
    MusicaApi.listar()
      .then((ms) => {
        if (!ms.length) return;
        setClipes(ms.map((m) => ({
          titulo: m.titulo,
          sub: m.tipo === 1 ? 'Clipe Oficial' : 'Áudio Oficial',
          tag: m.tipo === 1 ? 'Clipe' : 'Música',
          videoId: idYoutube(m.urlEmbed),
        })));
      })
      .catch(() => {});
  }, []);

  const corTag = (i: number) => (i % 3 === 0 ? 'bg-amarelo text-tinta' : i % 3 === 1 ? 'bg-verde text-white' : 'bg-vermelho text-white');

  return (
    <div className="bg-[#faf8f2]">
      <Seo title="Músicas e Clipes — Grupo Zero 14" description="Ouça as músicas e assista aos clipes do Grupo Zero 14. Pagode de raiz no YouTube e no Spotify." path="/musicas" />
      <JsonLdBreadcrumb itens={[{ nome: 'Início', url: 'https://grupozero14.com.br' }, { nome: 'Músicas', url: 'https://grupozero14.com.br/musicas' }]} />
      <Navbar variant="hero" heroRatio={0.5} esquerda={ESQUERDA} direita={DIREITA} />

      {/* ===== CABEÇALHO ===== */}
      <header className="textura-giz relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-azul px-6 pb-14 pt-[calc(92px+40px)] text-center text-white">
        <div className="relative z-[1]">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Escute o Zero 14</span>
          <h1 className="mt-1.5 font-display text-[clamp(54px,11vw,120px)] uppercase leading-[.95] [text-shadow:5px_5px_0_rgba(0,0,0,.22)]">Músicas</h1>
          <p className="mx-auto mt-3 max-w-[540px] text-white/85">Os clipes oficiais e onde ouvir o pagode do Zero 14 no repeat.</p>
          <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mx-auto mt-2.5 block h-3.5 w-[min(280px,60%)]">
            <path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#F5C518" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      {/* ===== CLIPES ===== */}
      <main className="px-6 pb-20 pt-16">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-11 text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[3px] text-vermelho">No repeat</span>
            <h2 className="mt-1.5 font-display text-[clamp(38px,6vw,64px)] uppercase leading-none text-azul">Clipes &amp; Vídeos</h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-[26px] gap-y-[34px]">
            {clipes.map((c, i) => (
              <article key={i}>
                <div className={`relative aspect-video overflow-hidden border-[3px] border-tinta bg-black shadow-[6px_6px_0_var(--color-tinta)] ${i % 2 ? 'rotate-[1.2deg] rounded-[26px_16px_24px_16px]' : 'rotate-[-1.2deg] rounded-[16px_26px_16px_24px]'}`}>
                  {aberto === i ? (
                    <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${c.videoId}?autoplay=1&rel=0`} title={c.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <button onClick={() => setAberto(i)} className="group relative block h-full w-full" aria-label={`Reproduzir: ${c.titulo}`}>
                      <img src={`https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`} alt={c.titulo} className="h-full w-full object-cover" loading="lazy" />
                      <span className="absolute left-1/2 top-1/2 flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vermelho shadow-[0_6px_18px_rgba(0,0,0,.45)] transition group-hover:scale-110">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                      <span className={`absolute left-3 top-3 -rotate-3 rounded-[8px_12px_8px_10px] border-2 border-tinta px-3 py-0.5 font-display text-sm uppercase tracking-wide ${corTag(i)}`}>{c.tag}</span>
                    </button>
                  )}
                </div>
                <div className="mt-3.5 px-1.5">
                  <h3 className="font-mao text-2xl leading-none text-tinta">{c.titulo}</h3>
                  <span className="mt-1 block text-[12.5px] uppercase tracking-wide text-neutral-500">{c.sub}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* ===== PLATAFORMAS ===== */}
      <section className="textura-giz relative overflow-hidden bg-[#0b0b0d] px-6 pb-[84px] pt-[76px] text-white">
        <div className="relative z-[1] mx-auto max-w-[900px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Toca aí</span>
          <h2 className="mt-1.5 font-display text-[clamp(34px,5.5vw,58px)] uppercase leading-none">Ouça nas plataformas</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-[18px]">
            <a href="#" aria-label="Ouvir no Spotify" className="inline-flex -rotate-[1.5deg] items-center gap-3 rounded-[14px_20px_14px_18px] border-[3px] border-tinta bg-white px-[26px] py-3.5 font-display text-xl uppercase text-tinta shadow-[5px_5px_0_rgba(0,0,0,.5)] transition hover:rotate-0 hover:-translate-y-0.5 hover:border-tinta hover:bg-[#1DB954] hover:text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[26px] w-[26px]"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86zm1.23-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.5c3.64-1.1 8.16-.56 11.24 1.34.37.22.49.71.25 1.07zm.1-2.85C14.8 8.94 9.4 8.76 6.3 9.7a.94.94 0 1 1-.54-1.8c3.56-1.08 9.5-.87 13.24 1.36a.94.94 0 0 1-.96 1.61z" /></svg>
              Spotify
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="Ouvir no YouTube" className="inline-flex rotate-[1.5deg] items-center gap-3 rounded-[14px_20px_14px_18px] border-[3px] border-tinta bg-white px-[26px] py-3.5 font-display text-xl uppercase text-tinta shadow-[5px_5px_0_rgba(0,0,0,.5)] transition hover:rotate-0 hover:-translate-y-0.5 hover:bg-vermelho hover:text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[26px] w-[26px]"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4a2.5 2.5 0 0 0-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7c.4-1.5.4-4.7.4-4.7ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z" /></svg>
              YouTube
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
