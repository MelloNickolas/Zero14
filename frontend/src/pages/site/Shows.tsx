import { useEffect, useState } from 'react';
import Navbar, { type NavItem } from '../../components/site/Navbar';
import Footer from '../../components/site/Footer';
import EventoApi from '../../services/eventoApi';
import ConfiguracaoApi from '../../services/configuracaoApi';
import JsonLdBreadcrumb from '../../components/site/JsonLdBreadcrumb';
import Seo from '../../components/site/Seo';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

type ShowItem = { dia: string; mesAbrev: string; evento: string; cidade: string; dataBR: string; temIngresso: boolean };
type Grupo = { titulo: string; shows: ShowItem[] };

const ESQUERDA: NavItem[] = [
  { label: 'Biografia', to: '/biografia', tipo: 'route' },
  { label: 'Shows', to: '/shows', tipo: 'route', ativo: true },
  { label: 'Fotos', to: '/galeria', tipo: 'route' },
];
const DIREITA: NavItem[] = [
  { label: 'Contato', to: '/#contato', tipo: 'anchor' },
  { label: 'Feedbacks', to: '/#feedbacks', tipo: 'anchor' },
  { label: 'Portfolio', to: '#', tipo: 'ext', configKey: 'portfolio' },
];

export default function Shows() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [whatsApp, setWhatsApp] = useState('');

  useEffect(() => {
    EventoApi.listar()
      .then((eventos) => {
        const futuros = eventos
          .filter((e) => new Date(e.data) >= new Date(new Date().toDateString()))
          .sort((a, b) => +new Date(a.data) - +new Date(b.data));
        const map = new Map<string, ShowItem[]>();
        for (const e of futuros) {
          const d = new Date(e.data);
          const chave = `${MESES[d.getMonth()]} ${d.getFullYear()}`;
          const item: ShowItem = { dia: String(d.getDate()).padStart(2, '0'), mesAbrev: ABREV[d.getMonth()], evento: e.nomeEvento, cidade: `${e.cidade} — ${e.uf}`, dataBR: d.toLocaleDateString('pt-BR'), temIngresso: !!e.linkIngresso?.trim() };
          map.set(chave, [...(map.get(chave) ?? []), item]);
        }
        setGrupos([...map.entries()].map(([titulo, shows]) => ({ titulo, shows })));
      })
      .catch(() => {})
      .finally(() => setCarregado(true));

    ConfiguracaoApi.obter().then((c) => setWhatsApp(c.whatsApp ?? '')).catch(() => {});
  }, []);

  // monta o link do WhatsApp com a mensagem pronta; sem número configurado, cai na seção de contato
  const numeroWa = whatsApp.replace(/\D/g, '');
  const numeroFinal = numeroWa && !numeroWa.startsWith('55') ? `55${numeroWa}` : numeroWa;
  const linkIngresso = (s: ShowItem) => {
    if (!numeroFinal) return '/#contato';
    const msg = `Quero saber sobre o ingresso do "${s.evento}"`;
    return `https://wa.me/${numeroFinal}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#faf8f2]">
      <Seo title="Shows e Agenda — Grupo Zero 14" description="Confira a agenda de shows do Grupo Zero 14 e não perca o pagode pertinho de você. Garanta seu ingresso!" path="/shows" />
      <JsonLdBreadcrumb itens={[{ nome: 'Início', url: 'https://grupozero14.com.br' }, { nome: 'Shows', url: 'https://grupozero14.com.br/shows' }]} />
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
          {carregado && grupos.length === 0 && (
            <div className="mx-auto max-w-[560px] rotate-[-.6deg] rounded-[26px_18px_26px_18px] border-[3px] border-dashed border-tinta/40 bg-[#fffdf7] p-12 text-center shadow-[6px_6px_0_rgba(20,23,28,.12)]">
              <div className="font-display text-[clamp(30px,6vw,48px)] uppercase leading-none text-azul">Em breve</div>
              <p className="mt-3 font-mao text-xl text-neutral-600">Novos shows estão sendo marcados. Fica de olho aqui!</p>
              <a href="/#contato" className="mt-6 inline-block -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-6 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">Quer o Zero 14 na sua cidade?</a>
            </div>
          )}
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
                        {s.temIngresso ? (
                          <a href={linkIngresso(s)} target={numeroFinal ? '_blank' : undefined} rel={numeroFinal ? 'noopener noreferrer' : undefined} className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display text-base uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5 hover:bg-[#1aa64c]">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.47 3.63-8.1 8.1-8.1Zm4.65 10.16c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.13-.56.13-.17.25-.65.82-.79.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.29Z" /></svg>
                            Ingressos
                          </a>
                        ) : (
                          <span aria-disabled="true" title="Ingresso ainda não disponível" className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-neutral-400 bg-neutral-200 px-5 py-2.5 font-display text-base uppercase text-neutral-500">
                            Em breve
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          {grupos.length > 0 && (
            <p className="mx-auto mt-12 max-w-[940px] text-center font-mao text-lg text-neutral-500">
              Quer o Zero 14 na sua cidade? <a href="/#contato" className="font-bold text-azul hover:underline">Fala com a gente!</a>
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
