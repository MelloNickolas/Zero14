import { useEffect, useState } from 'react';
import Navbar, { type NavItem } from '../../components/site/Navbar';
import Footer from '../../components/site/Footer';
import EventoApi from '../../services/eventoApi';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

type ShowItem = { dia: string; mesAbrev: string; evento: string; cidade: string };
type Grupo = { titulo: string; shows: ShowItem[] };

const EXEMPLO: Grupo[] = [
  { titulo: 'Agosto 2026', shows: [
    { dia: '29', mesAbrev: 'Ago', evento: 'Churrasquinho da Galera', cidade: 'Campinas — SP' },
    { dia: '30', mesAbrev: 'Ago', evento: 'Pagode do Zero 14', cidade: 'São Paulo — SP' },
  ]},
  { titulo: 'Setembro 2026', shows: [
    { dia: '06', mesAbrev: 'Set', evento: 'Roda de Samba na Praia', cidade: 'Santos — SP' },
    { dia: '12', mesAbrev: 'Set', evento: 'Zero 14 ao Vivo', cidade: 'Rio de Janeiro — RJ' },
    { dia: '20', mesAbrev: 'Set', evento: 'Samba de Raiz', cidade: 'Belo Horizonte — MG' },
  ]},
  { titulo: 'Outubro 2026', shows: [
    { dia: '04', mesAbrev: 'Out', evento: 'Pagode em Cartaz', cidade: 'Criciúma — SC' },
    { dia: '18', mesAbrev: 'Out', evento: 'Zero 14 Convida', cidade: 'Porto Alegre — RS' },
    { dia: '25', mesAbrev: 'Out', evento: 'Festival de Pagode', cidade: 'Curitiba — PR' },
  ]},
  { titulo: 'Novembro 2026', shows: [
    { dia: '08', mesAbrev: 'Nov', evento: 'Zero 14 na Praia', cidade: 'Florianópolis — SC' },
    { dia: '22', mesAbrev: 'Nov', evento: 'Encontro de Pagode', cidade: 'Brasília — DF' },
  ]},
];

const ESQUERDA: NavItem[] = [
  { label: 'Biografia', to: '/biografia', tipo: 'route' },
  { label: 'Shows', to: '/shows', tipo: 'route', ativo: true },
  { label: 'Fotos', to: '/galeria', tipo: 'route' },
];
const DIREITA: NavItem[] = [
  { label: 'Contato', to: '/#contato', tipo: 'anchor' },
  { label: 'Feedbacks', to: '/#feedbacks', tipo: 'anchor' },
  { label: 'Instagram', to: 'https://www.instagram.com/grupozero14/', tipo: 'ext' },
];

export default function Shows() {
  const [grupos, setGrupos] = useState<Grupo[]>(EXEMPLO);

  useEffect(() => {
    EventoApi.listar()
      .then((eventos) => {
        const futuros = eventos
          .filter((e) => new Date(e.data) >= new Date(new Date().toDateString()))
          .sort((a, b) => +new Date(a.data) - +new Date(b.data));
        if (!futuros.length) return; // mantém o exemplo
        const map = new Map<string, ShowItem[]>();
        for (const e of futuros) {
          const d = new Date(e.data);
          const chave = `${MESES[d.getMonth()]} ${d.getFullYear()}`;
          const item: ShowItem = { dia: String(d.getDate()).padStart(2, '0'), mesAbrev: ABREV[d.getMonth()], evento: e.nomeEvento, cidade: `${e.cidade} — ${e.uf}` };
          map.set(chave, [...(map.get(chave) ?? []), item]);
        }
        setGrupos([...map.entries()].map(([titulo, shows]) => ({ titulo, shows })));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[#faf8f2]">
      <Navbar variant="hero" heroRatio={0.5} esquerda={ESQUERDA} direita={DIREITA} />

      {/* ===== CABEÇALHO ===== */}
      <header className="textura-giz relative flex min-h-[56vh] items-center justify-center overflow-hidden bg-azul px-6 pb-14 pt-[calc(92px+40px)] text-center text-white">
        <div className="relative z-[1]">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">É no pagode do Zero 14</span>
          <h1 className="mt-1.5 font-display text-[clamp(56px,12vw,128px)] uppercase leading-[.95] [text-shadow:5px_5px_0_rgba(0,0,0,.22)]">Shows</h1>
          <p className="mx-auto mt-3 max-w-[520px] text-white/85">Confira a agenda e não perca o Zero 14 pertinho de você.</p>
          <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mx-auto mt-2.5 block h-3.5 w-[min(280px,60%)]">
            <path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#F5C518" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      {/* ===== LISTA ===== */}
      <main className="px-6 pb-[90px] pt-16">
        <div className="mx-auto max-w-[940px]">
          {grupos.map((g) => (
            <section key={g.titulo} className="mb-12 last:mb-0">
              <h2 className="mb-[22px] flex items-baseline gap-3.5 font-display text-[clamp(30px,5.5vw,52px)] uppercase leading-none text-azul">
                {g.titulo.split(' ')[0]} <span className="font-corpo text-[clamp(15px,2.2vw,20px)] font-bold tracking-wide text-vermelho">{g.titulo.split(' ')[1]}</span>
              </h2>
              <div className="flex flex-col gap-[18px]">
                {g.shows.map((s, i) => {
                  const par = i % 2 === 1;
                  return (
                    <article
                      key={i}
                      className={`grid grid-cols-[auto_1fr_auto] items-center gap-[22px] border-[3px] border-tinta p-[18px_26px] max-[680px]:grid-cols-[auto_1fr] max-[680px]:gap-y-4 max-[680px]:[grid-template-areas:'data_info''cta_cta'] ${
                        par
                          ? 'rotate-[.5deg] rounded-[30px_18px_26px_18px] bg-azul text-white shadow-[6px_6px_0_var(--color-tinta)]'
                          : 'rotate-[-.5deg] rounded-[18px_30px_18px_26px] bg-[#fffdf7] text-tinta shadow-[6px_6px_0_var(--color-tinta)]'
                      }`}
                    >
                      <div className={`min-w-[92px] pr-[22px] text-center max-[680px]:[grid-area:data] ${par ? 'border-r-2 border-dashed border-white/40' : 'border-r-2 border-dashed border-tinta/25'}`}>
                        <div className={`font-display text-[54px] leading-none ${par ? 'text-amarelo' : 'text-vermelho'}`}>{s.dia}</div>
                        <div className="mt-0.5 text-xs font-bold uppercase tracking-widest opacity-80">{s.mesAbrev}</div>
                      </div>
                      <div className="min-w-0 max-[680px]:[grid-area:info]">
                        <div className="font-mao text-[clamp(21px,2.6vw,28px)] leading-tight">{s.evento}</div>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] uppercase tracking-wide opacity-80">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={par ? 'text-amarelo' : 'text-azul'}><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                          {s.cidade}
                        </div>
                      </div>
                      <div className="max-[680px]:[grid-area:cta]">
                        <a href="#" className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display text-base uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5 hover:bg-[#1aa64c]">Mais detalhes</a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          <p className="mx-auto mt-12 max-w-[940px] text-center font-mao text-lg text-neutral-500">
            Quer o Zero 14 na sua cidade? <a href="/#contato" className="font-bold text-azul hover:underline">Fala com a gente!</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
