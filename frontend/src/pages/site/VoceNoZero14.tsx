import { useEffect, useState } from 'react';
import Navbar, { type NavItem } from '../../components/site/Navbar';
import Footer from '../../components/site/Footer';
import RegistroApi from '../../services/registroApi';
import JsonLdBreadcrumb from '../../components/site/JsonLdBreadcrumb';
import Seo from '../../components/site/Seo';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

type Card = { id: number; capa: string; dia: string; mesAbrev: string; local: string; cidade: string; drive: string };
type Grupo = { titulo: string; cards: Card[] };

const ESQUERDA: NavItem[] = [
  { label: 'Biografia', to: '/biografia', tipo: 'route' },
  { label: 'Shows', to: '/shows', tipo: 'route' },
  { label: 'Fotos', to: '/galeria', tipo: 'route' },
];
const DIREITA: NavItem[] = [
  { label: 'Contato', to: '/#contato', tipo: 'anchor' },
  { label: 'Feedbacks', to: '/#feedbacks', tipo: 'anchor' },
  { label: 'Portfolio', to: '#', tipo: 'ext', configKey: 'portfolio' },
];

export default function VoceNoZero14() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    RegistroApi.listar()
      .then((registros) => {
        const ordenados = [...registros].sort((a, b) => +new Date(b.data) - +new Date(a.data));
        const map = new Map<string, Card[]>();
        for (const r of ordenados) {
          const d = new Date(r.data);
          const chave = `${MESES[d.getMonth()]} ${d.getFullYear()}`;
          const card: Card = { id: r.id, capa: r.capaUrl, dia: String(d.getDate()).padStart(2, '0'), mesAbrev: ABREV[d.getMonth()], local: r.local, cidade: `${r.cidade} — ${r.uf}`, drive: r.linkDrive };
          map.set(chave, [...(map.get(chave) ?? []), card]);
        }
        setGrupos([...map.entries()].map(([titulo, cards]) => ({ titulo, cards })));
      })
      .catch(() => {})
      .finally(() => setCarregado(true));
  }, []);

  return (
    <div className="bg-[#faf8f2]">
      <Seo title="Você no Zero 14 — Fotos e vídeos dos shows" description="Esteve em um show do Grupo Zero 14? Encontre aqui os links com as fotos e vídeos de cada show e reviva a noite." path="/voce-no-zero14" />
      <JsonLdBreadcrumb itens={[{ nome: 'Início', url: 'https://grupozero14.com.br' }, { nome: 'Você no Zero 14', url: 'https://grupozero14.com.br/voce-no-zero14' }]} />
      <Navbar variant="hero" heroRatio={0.5} esquerda={ESQUERDA} direita={DIREITA} />

      {/* ===== CABEÇALHO ===== */}
      <header className="textura-giz relative flex min-h-[56vh] items-center justify-center overflow-hidden bg-azul px-6 pb-14 pt-[calc(92px+40px)] text-center text-white">
        <div className="relative z-[1]">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Seus registros do show</span>
          <h1 className="mt-1.5 font-display text-[clamp(44px,10vw,112px)] uppercase leading-[.95] [text-shadow:5px_5px_0_rgba(0,0,0,.22)]">Você no <span className="text-amarelo">Zero 14</span></h1>
          <p className="mx-auto mt-3 max-w-[540px] text-white/85">Esteve em um show nosso? Encontre o seu e reviva a noite com as fotos e os vídeos.</p>
          <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mx-auto mt-2.5 block h-3.5 w-[min(280px,60%)]">
            <path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#F5C518" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      {/* ===== LISTA ===== */}
      <main className="px-6 pb-[90px] pt-16">
        <div className="mx-auto max-w-[1160px]">
          {carregado && grupos.length === 0 && (
            <div className="mx-auto max-w-[560px] rotate-[-.6deg] rounded-[26px_18px_26px_18px] border-[3px] border-dashed border-tinta/40 bg-[#fffdf7] p-12 text-center shadow-[6px_6px_0_rgba(20,23,28,.12)]">
              <div className="font-display text-[clamp(30px,6vw,48px)] uppercase leading-none text-azul">Em breve</div>
              <p className="mt-3 font-mao text-xl text-neutral-600">Os registros dos shows vão aparecer por aqui. Fica de olho!</p>
            </div>
          )}

          {grupos.map((g) => (
            <section key={g.titulo} className="mb-14 last:mb-0">
              <h2 className="mb-7 flex items-baseline gap-3.5 font-display text-[clamp(30px,5.5vw,52px)] uppercase leading-none text-azul">
                {g.titulo.split(' ')[0]} <span className="font-corpo text-[clamp(15px,2.2vw,20px)] font-bold tracking-wide text-vermelho">{g.titulo.split(' ')[1]}</span>
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {g.cards.map((c, i) => {
                  const par = i % 2 === 1;
                  return (
                    <article
                      key={c.id}
                      className={`group relative flex flex-col border-[3px] border-tinta shadow-[6px_6px_0_var(--color-tinta)] transition duration-200 hover:-translate-y-1 hover:rotate-0 ${
                        par ? 'rotate-[.7deg] rounded-[26px_16px_24px_16px] bg-azul text-white' : 'rotate-[-.7deg] rounded-[16px_26px_16px_24px] bg-[#fffdf7] text-tinta'
                      }`}
                    >
                      {/* fita washi */}
                      <span aria-hidden="true" className={`absolute -top-3 left-1/2 z-[3] h-5 w-[72px] -translate-x-1/2 border border-dashed border-black/20 ${par ? 'rotate-[4deg] bg-amarelo/60' : '-rotate-[4deg] bg-azul/35'}`} />

                      {/* capa */}
                      <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-neutral-200">
                        <img src={c.capa} alt={`Show em ${c.local} — ${c.cidade}`} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        {/* selo da data */}
                        <div className="absolute bottom-2.5 left-2.5 -rotate-3 rounded-[10px_14px_10px_12px] border-[3px] border-tinta bg-amarelo px-3 py-1 text-center text-tinta shadow-[3px_3px_0_var(--color-tinta)]">
                          <div className="font-display text-3xl leading-none">{c.dia}</div>
                          <div className="text-[11px] font-bold uppercase tracking-widest">{c.mesAbrev}</div>
                        </div>
                      </div>

                      {/* infos */}
                      <div className="flex flex-1 flex-col gap-3 p-[18px_20px_22px]">
                        <div>
                          <h3 className="font-mao text-[clamp(22px,2.4vw,27px)] leading-tight">{c.local}</h3>
                          <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] uppercase tracking-wide opacity-80">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={par ? 'text-amarelo' : 'text-azul'}><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                            {c.cidade}
                          </div>
                        </div>
                        <a
                          href={c.drive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta px-5 py-2.5 font-display text-base uppercase shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5 ${
                            par ? 'bg-amarelo text-tinta hover:bg-[#ffd43b]' : 'bg-azul text-white hover:bg-[#2a33ff]'
                          }`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5-8 8" /></svg>
                          Ver fotos e vídeos
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
