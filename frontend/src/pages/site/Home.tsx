import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/site/Navbar';
import Footer from '../../components/site/Footer';
import EventoApi from '../../services/eventoApi';
import FotoApi from '../../services/fotoApi';
import ConfiguracaoApi from '../../services/configuracaoApi';
import ComentarioApi from '../../services/comentarioApi';
import MusicaApi from '../../services/musicaApi';
import EstatisticaApi from '../../services/estatisticaApi';
import PatrocinadorApi from '../../services/patrocinadorApi';
import type { Evento, Foto, Configuracao, Comentario, Estatisticas, Patrocinador } from '../../services/types';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function idYoutube(v?: string): string {
  if (!v) return '7pOh3PVH8lE';
  const m = v.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : v;
}

type ShowCard = { mes: string; evento: string; dia: string; uf: string; cidade: string };
const RECADOS_EXEMPLO_A = [
  { mensagem: 'Show sensacional em São Paulo! Já quero o próximo.', nome: 'João P.' },
  { mensagem: 'Melhor pagode que já vi ao vivo!', nome: 'Mariana S.' },
  { mensagem: 'Quando vocês vêm pra Minas?? Tô esperando!', nome: 'Carlos E.' },
  { mensagem: 'Energia contagiante do começo ao fim.', nome: 'Bea R.' },
  { mensagem: 'Zero 14 é raiz! Sucesso sempre.', nome: 'Rafa L.' },
];
const RECADOS_EXEMPLO_B = [
  { mensagem: 'Cantei todas as músicas, foi surreal!', nome: 'Nay' },
  { mensagem: 'Fui no churrasquinho e não paro de ouvir.', nome: 'Diego M.' },
  { mensagem: 'Playlist no repeat direto.', nome: 'Lu' },
  { mensagem: 'Melhor grupo revelação, disparado!', nome: 'Thiago' },
  { mensagem: 'Vocês fazem a festa acontecer!', nome: 'Amanda' },
];

const Squiggle = ({ cor }: { cor: string }) => (
  <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mx-auto mt-1.5 block h-3.5 w-[min(240px,55%)]">
    <path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke={cor} strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);
const Pin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-vermelho"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
);
const Seta = ({ dir }: { dir: 'esq' | 'dir' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points={dir === 'esq' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
);
const EmBreve = ({ texto, escuro = false }: { texto: string; escuro?: boolean }) => (
  <div className={`mx-auto max-w-[520px] rotate-[-.6deg] rounded-[26px_18px_26px_18px] border-[3px] border-dashed p-10 text-center ${escuro ? 'border-white/30 bg-white/5' : 'border-tinta/40 bg-[#fffdf7] shadow-[6px_6px_0_rgba(20,23,28,.12)]'}`}>
    <div className={`font-display text-[clamp(26px,5vw,40px)] uppercase leading-none ${escuro ? 'text-amarelo' : 'text-azul'}`}>Em breve</div>
    <p className={`mt-2.5 font-mao text-lg ${escuro ? 'text-white/80' : 'text-neutral-600'}`}>{texto}</p>
  </div>
);

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [config, setConfig] = useState<Configuracao | null>(null);
  const [recados, setRecados] = useState<Comentario[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [videoId, setVideoId] = useState('7pOh3PVH8lE');
  const [videoAberto, setVideoAberto] = useState(false);
  const [eventosCarregados, setEventosCarregados] = useState(false);
  const [fotosCarregados, setFotosCarregados] = useState(false);

  const [modal, setModal] = useState(false);
  const [recNome, setRecNome] = useState('');
  const [recMsg, setRecMsg] = useState('');
  const [recEnviado, setRecEnviado] = useState(false);

  const agendaRef = useRef<HTMLDivElement>(null);
  const fotosRef = useRef<HTMLDivElement>(null);
  const patrocColRef = useRef<HTMLDivElement>(null);
  const patrocSetRef = useRef<HTMLDivElement>(null);
  const [patrocMarquee, setPatrocMarquee] = useState(false);

  useEffect(() => {
    EventoApi.listar().then(setEventos).catch(() => {}).finally(() => setEventosCarregados(true));
    FotoApi.listar().then(setFotos).catch(() => {}).finally(() => setFotosCarregados(true));
    ConfiguracaoApi.obter().then(setConfig).catch(() => {});
    ComentarioApi.listarAprovados().then(setRecados).catch(() => {});
    EstatisticaApi.obter().then(setEstatisticas).catch(() => {});
    PatrocinadorApi.listar().then(setPatrocinadores).catch(() => {});
    MusicaApi.listar()
      .then((ms) => { const d = ms.find((m) => m.destaque) ?? ms[0]; if (d?.urlEmbed) setVideoId(idYoutube(d.urlEmbed)); })
      .catch(() => {});
  }, []);

  async function enviarRecado(e: FormEvent) {
    e.preventDefault();
    try {
      await ComentarioApi.criar(recNome, recMsg);
      setRecEnviado(true); setRecNome(''); setRecMsg('');
      setTimeout(() => { setModal(false); setRecEnviado(false); }, 2400);
    } catch { /* silencioso */ }
  }

  const rolar = (ref: React.RefObject<HTMLDivElement | null>, dir: number) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: 'smooth' });

  // clique no patrocinador: conta o clique (fire-and-forget) e segue pro link
  const aoClicarPatrocinador = (e: React.MouseEvent, p: Patrocinador) => {
    PatrocinadorApi.registrarClique(p.id);
    if (!p.link) e.preventDefault();
  };

  // liga o auto-scroll só quando os logos estouram a largura disponível
  useEffect(() => {
    const medir = () => {
      const col = patrocColRef.current, set = patrocSetRef.current;
      if (!col || !set) return;
      setPatrocMarquee(set.scrollWidth > col.clientWidth + 4);
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (patrocColRef.current) ro.observe(patrocColRef.current);
    return () => ro.disconnect();
  }, [patrocinadores]);

  const itemPatrocinador = (p: Patrocinador, i: number, aria = false) => (
    <a
      key={`${aria ? 'dup-' : ''}${p.id}`}
      href={p.link || '#'}
      onClick={(e) => aoClicarPatrocinador(e, p)}
      target="_blank"
      rel="noopener noreferrer"
      title={p.nome}
      aria-label={p.nome}
      tabIndex={aria ? -1 : undefined}
      className="entra-item group relative mr-8 flex shrink-0 flex-col items-center"
      style={{ animationDelay: `${i * 70}ms` }}
    >
      <div className={`flex h-16 w-16 items-center justify-center opacity-100 transition duration-300 md:opacity-60 md:group-hover:-translate-y-1 md:group-hover:rotate-0 md:group-hover:scale-110 md:group-hover:opacity-100 ${i % 2 ? 'rotate-2' : '-rotate-2'}`}>
        <img src={p.logoUrl} alt={p.nome} className="h-full w-full object-contain" loading="lazy" />
      </div>
      {/* nome fixo (mobile, sem hover) */}
      <span className="mt-2 block max-w-[84px] truncate text-center font-display text-[10px] uppercase leading-tight text-white/85 md:hidden">{p.nome}</span>
      {/* nome como balão (desktop, no hover) */}
      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2.5 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[8px_12px_8px_10px] border-2 border-tinta bg-amarelo px-3 py-1.5 text-center opacity-0 shadow-[3px_3px_0_rgba(0,0,0,.35)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:block">
        <span className="block font-display text-xs uppercase tracking-wide text-tinta">{p.nome}</span>
        {p.cliques > 0 && <span className="mt-0.5 block text-[10px] font-semibold text-tinta/70">+{p.cliques} pessoas já viram esse perfil</span>}
      </div>
    </a>
  );

  // dados exibidos (só o real da API — sem exemplo). Agenda mostra apenas shows futuros.
  const inicioHoje = new Date(new Date().toDateString());
  const agenda: ShowCard[] = eventos
    .filter((ev) => new Date(ev.data) >= inicioHoje)
    .sort((a, b) => +new Date(a.data) - +new Date(b.data))
    .map((ev) => { const d = new Date(ev.data); return { mes: MESES[d.getMonth()], evento: ev.nomeEvento, dia: String(d.getDate()).padStart(2, '0'), uf: ev.uf, cidade: ev.cidade }; });
  const listaFotos = fotos.map((f) => f.url);
  const temRecados = recados.length > 0;
  const recA = temRecados ? recados.map((r) => ({ mensagem: r.mensagem, nome: r.nome })) : RECADOS_EXEMPLO_A;
  const recB = temRecados ? [...recados].reverse().map((r) => ({ mensagem: r.mensagem, nome: r.nome })) : RECADOS_EXEMPLO_B;
  const tel = config?.telefone || '(11) 91234-5678';
  const emailShows = config?.emailShows || 'shows@grupozero14.com.br';
  const emailImprensa = config?.emailImprensa || 'parcerias@grupozero14.com.br';
  const instagram = config?.instagram || 'https://www.instagram.com/grupozero14/';
  const youtube = config?.youtube || '#';
  const tiktok = config?.tiktok || '#';
  const fotoContato = config?.fotoContatoUrl || '/assets/grupo-recorte.png';
  const portfolio = config?.portfolio || config?.instagram || '#';

  // números da seção "O Zero 14 em números" (backend: /Estatistica). "—" enquanto carrega.
  const fmtNum = (n: number) => n.toLocaleString('pt-BR');
  const numeros: [string, string][] = [
    [estatisticas ? `${fmtNum(estatisticas.showsRealizados)}+` : '—', 'Shows realizados'],
    [estatisticas ? `${fmtNum(estatisticas.seguidores)}+` : '—', 'Seguidores'],
    [estatisticas ? `${fmtNum(estatisticas.recados)}+` : '—', 'Recados de fãs'],
    [estatisticas ? `${fmtNum(estatisticas.cidades)}+` : '—', 'Cidades pelo Brasil'],
  ];

  const btnVerMais = 'inline-block -rotate-1 rounded-[16px_26px_18px_24px] border-[3px] border-tinta bg-azul px-9 py-2.5 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5';
  const seta = 'flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-tinta bg-white text-azul shadow-[3px_3px_0_var(--color-tinta)] transition hover:bg-amarelo hover:text-tinta';

  return (
    <div className="bg-[#f4f5f7]">
      <Navbar variant="hero" />

      {/* ===== HERO ===== */}
      <section id="inicio" className="relative min-h-dvh" aria-label="Grupo Zero 14 - É no pagode do Zero 14">
        <picture>
          <source media="(max-width:549px)" srcSet="/assets/Hero-Small.png" />
          <source media="(max-width:749px)" srcSet="/assets/Hero-Mobile.png" />
          <source media="(max-width:1024px)" srcSet="/assets/Hero-Tablet.png" />
          <img src="/assets/Hero-Desktop.png" alt="Grupo Zero 14" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
      </section>

      {/* ===== PATROCINADORES ===== */}
      {patrocinadores.length > 0 && (
        <section id="patrocinadores" className="textura-giz relative bg-tinta px-6 py-[30px] text-white">
          <div className="relative z-[1] mx-auto flex max-w-[1160px] flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
            {/* logos brancas à esquerda — estáticas; se estourarem a largura, viram auto-scroll */}
            <div ref={patrocColRef} className={`w-full min-w-0 md:flex-1 ${patrocMarquee ? 'overflow-hidden pb-12' : ''}`}>
              <div className={patrocMarquee ? 'flex w-max animate-logos' : 'flex justify-center md:justify-start'}>
                <div ref={patrocSetRef} className="flex shrink-0">
                  {patrocinadores.map((p, i) => itemPatrocinador(p, i))}
                </div>
                {patrocMarquee && (
                  <div className="flex shrink-0" aria-hidden="true">
                    {patrocinadores.map((p, i) => itemPatrocinador(p, i, true))}
                  </div>
                )}
              </div>
            </div>

            {/* texto à direita — mesmo estilo do "O Zero 14 em números", espelhado */}
            <div className="shrink-0 text-center md:text-right">
              <span className="text-xs font-semibold uppercase tracking-[2.5px] text-amarelo">Zero 14 agradece</span>
              <h2 className="mt-1 font-display text-[clamp(20px,2.4vw,28px)] uppercase leading-tight tracking-wide text-white">Quem apoia o pagode</h2>
            </div>
          </div>
        </section>
      )}

      {/* ===== ASSISTA AGORA ===== */}
      <section id="assista" className="relative flex min-h-dvh items-end justify-center overflow-hidden bg-azul pt-28 max-[749px]:items-start">
        <picture>
          <source media="(max-width:549px)" srcSet="/assets/Video-Small.png" />
          <source media="(max-width:749px)" srcSet="/assets/Video-Mobile.png" />
          <source media="(max-width:1024px)" srcSet="/assets/Video-Tablet.png" />
          <img src="/assets/Video-Desktop.png" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
        </picture>
        {/* marquee inclinado (uma vazada, outra sólida) */}
        <div className="pointer-events-none absolute inset-x-[-8%] top-[70%] z-[1] -translate-y-1/2 -rotate-[5deg] overflow-hidden max-[749px]:top-[185px]">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="pr-11 font-display text-[clamp(38px,6.5vw,76px)] uppercase leading-none tracking-[2px] max-[749px]:text-[clamp(30px,9vw,46px)]"
                style={i % 2 === 0 ? { color: 'transparent', WebkitTextStroke: '1.6px rgba(30,39,235,.7)' } : { color: 'var(--color-azul)' }}
              >
                Assista agora •
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-[2] mb-[5%] flex w-full flex-col items-center gap-6 px-6">
          <div className="aspect-video w-full max-w-[540px] overflow-hidden rounded-2xl border-[3px] border-tinta bg-black shadow-[0_20px_50px_rgba(0,0,0,.35)] max-[749px]:max-w-[260px]">
            {videoAberto ? (
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="Grupo Zero 14" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
              <button onClick={() => setVideoAberto(true)} className="group relative block h-full w-full" aria-label="Reproduzir vídeo">
                <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="Clipe do Grupo Zero 14" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }} />
                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vermelho shadow-[0_8px_24px_rgba(0,0,0,.45)] transition group-hover:scale-110">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            )}
          </div>
          <Link to="/musicas" className="inline-flex -rotate-1 items-center gap-2.5 rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-amarelo px-7 py-3 font-display text-xl uppercase text-tinta shadow-[5px_5px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            Ver todas as músicas
          </Link>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section id="numeros" className="textura-giz relative overflow-hidden bg-azul px-6 py-[30px] text-white">
        <div className="relative z-[1] mx-auto grid max-w-[1160px] items-center gap-10 md:grid-cols-[auto_1.6fr]">
          <div className="text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[2.5px] text-amarelo">Puro suco do pagode</span>
            <h2 className="mt-1 font-display text-[clamp(20px,2.4vw,28px)] uppercase leading-tight tracking-wide">O Zero 14 em números</h2>
          </div>
          <div className="grid grid-cols-2 gap-y-4 min-[460px]:grid-cols-4 min-[460px]:gap-y-0">
            {numeros.map(([n, l], i) => (
              <div key={l} className={`relative px-2 text-center ${i > 0 ? 'min-[460px]:before:absolute min-[460px]:before:left-0 min-[460px]:before:top-1/2 min-[460px]:before:h-[56%] min-[460px]:before:-translate-y-1/2 min-[460px]:before:border-l-2 min-[460px]:before:border-dashed min-[460px]:before:border-white/30' : ''}`}>
                <div className="font-display text-[clamp(26px,3vw,36px)] leading-none">{n}</div>
                <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-white/80">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA PORTFÓLIO ===== */}
      <section className="textura-giz relative overflow-hidden bg-azul px-6 py-[clamp(64px,10vw,110px)] text-white">
        {/* ícones flutuando */}
        <svg aria-hidden="true" className="flutua pointer-events-none absolute left-[8%] top-[20%] h-11 w-11 text-amarelo [--giro:-10deg]" style={{ animationDelay: '.2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        <svg aria-hidden="true" className="flutua pointer-events-none absolute right-[9%] top-[16%] h-10 w-10 text-white/80 [--giro:9deg]" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
        <svg aria-hidden="true" className="flutua pointer-events-none absolute bottom-[18%] left-[13%] hidden h-10 w-10 text-amarelo md:block [--giro:8deg]" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm2 12h12l-4-5-3 4-2-2-3 3zM8 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /></svg>
        <svg aria-hidden="true" className="flutua pointer-events-none absolute bottom-[16%] right-[12%] hidden h-9 w-9 text-verde md:block [--giro:-8deg]" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M9 17.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V4l10-2v9.5a2.5 2.5 0 1 1-2.5-2.5c.4 0 .7.1 1 .2V6L9 7.2v10.3z" /></svg>
        <svg aria-hidden="true" className="flutua pointer-events-none absolute right-[20%] top-[46%] hidden h-6 w-6 text-amarelo lg:block [--giro:12deg]" style={{ animationDelay: '.7s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.3L21 9l-5 4.2L17.6 20 12 16.3 6.4 20 8 13.2 3 9l6.6-.7z" /></svg>

        <div className="relative z-[1] mx-auto max-w-[820px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Zero 14 ao vivo</span>
          <h2 className="mt-2 font-display text-[clamp(42px,8vw,84px)] uppercase leading-[.92]">Já viu a gente <span className="text-amarelo">de perto?</span></h2>
          <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" className="mx-auto mt-3 block h-4 w-[min(280px,60%)]"><path d="M3 9 C 45 2, 78 12, 118 7 S 196 2, 234 8 S 286 5, 297 7" fill="none" stroke="#F5C518" strokeWidth="5" strokeLinecap="round" /></svg>
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] leading-relaxed text-white/85">Dá uma olhada nos <strong className="text-white">vídeos e fotos</strong> dos nossos shows — a resenha completa, do palco à galera.</p>
          <a href={portfolio} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2.5 -rotate-1 rounded-[16px_26px_16px_22px] border-[3px] border-tinta bg-amarelo px-9 py-4 font-display text-xl uppercase text-tinta shadow-[6px_6px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5 hover:bg-[#ffd43b]">
            Ver portfólio
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </section>

      {/* ===== AGENDA ===== */}
      <section id="agenda" className="bg-[#faf8f2] px-6 py-[90px]">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-11 text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[3px] text-vermelho">É no pagode do Zero 14</span>
            <h2 className="mt-2 font-display text-[clamp(40px,7vw,84px)] uppercase leading-none text-azul">Agenda</h2>
            <Squiggle cor="#E12E27" />
          </div>

          {agenda.length > 0 ? (
            <>
              <div ref={agendaRef} className="flex gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {agenda.map((ev, i) => (
                  <div key={i} className={`flex min-h-[336px] w-[244px] shrink-0 flex-col rounded-[26px_44px_26px_42px] border-[3px] border-tinta p-[30px_24px_26px] text-white shadow-[7px_7px_0_var(--color-tinta)] ${i % 2 === 0 ? 'rotate-[-1.4deg] bg-azul' : 'rotate-[1.4deg] bg-[#0f1442]'}`}>
                    <div className="text-center text-[13px] font-bold uppercase tracking-widest text-amarelo">{ev.mes}</div>
                    <div className="mt-1.5 min-h-[44px] text-center font-mao text-[19px]">{ev.evento}</div>
                    <div className="mb-auto mt-2.5 text-center font-display text-[82px] leading-none">{ev.dia}</div>
                    <div className="mt-4 border-t-2 border-dashed border-white/40 pt-3.5">
                      <div className="font-display text-3xl leading-none">{ev.uf}</div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/85"><Pin /> {ev.cidade}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={() => rolar(agendaRef, -1)} className={seta} aria-label="Shows anteriores"><Seta dir="esq" /></button>
                <Link to="/shows" className={btnVerMais}>Ver mais</Link>
                <button onClick={() => rolar(agendaRef, 1)} className={seta} aria-label="Próximos shows"><Seta dir="dir" /></button>
              </div>
            </>
          ) : eventosCarregados ? (
            <EmBreve texto="Novos shows estão sendo marcados. Fica de olho aqui!" />
          ) : null}
        </div>
      </section>

      {/* ===== FOTOS ===== */}
      <section id="fotos" className="textura-giz relative overflow-hidden bg-[#0b0b0d] px-6 py-14 text-white">
        <div className="relative z-[1] mx-auto max-w-[1160px]">
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[3px] text-amarelo">Momentos do grupo</span>
            <h2 className="mt-1.5 font-display text-[clamp(32px,5vw,58px)] uppercase leading-none">Fotos</h2>
          </div>
          {listaFotos.length === 0 ? (
            fotosCarregados ? <EmBreve texto="Em breve as fotos dos shows do grupo aqui!" escuro /> : null
          ) : (
          <>
          <div ref={fotosRef} className="flex gap-4 overflow-x-auto pb-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {listaFotos.map((url, i) => (
              <figure key={i} className={`relative h-[clamp(260px,50vh,430px)] shrink-0 overflow-hidden rounded-[8px_14px_8px_12px] border-4 border-[#f5f2e9] shadow-[0_14px_30px_rgba(0,0,0,.55)] before:absolute before:-top-[11px] before:left-1/2 before:z-[3] before:h-5 before:w-[68px] before:-translate-x-1/2 before:border before:border-dashed before:border-black/20 ${i % 2 ? 'rotate-[1.5deg] before:rotate-[5deg] before:bg-azul/35' : 'rotate-[-1.5deg] before:-rotate-[4deg] before:bg-amarelo/50'}`}>
                <img src={url} alt="Grupo Zero 14 ao vivo" className="h-full w-auto" loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => rolar(fotosRef, -1)} className={seta} aria-label="Fotos anteriores"><Seta dir="esq" /></button>
            <Link to="/galeria" className={btnVerMais}>Ver galeria</Link>
            <button onClick={() => rolar(fotosRef, 1)} className={seta} aria-label="Próximas fotos"><Seta dir="dir" /></button>
          </div>
          </>
          )}
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="textura-giz relative overflow-hidden bg-gradient-to-b from-white to-[#f3f3f6] px-6 pb-[84px] pt-[78px]">
        <div className="relative z-[1] mx-auto max-w-[1140px]">
          <div className="mb-10 text-center">
            <h2 className="font-display text-[clamp(40px,7vw,80px)] uppercase leading-none text-tinta">Contato</h2>
            <Squiggle cor="#E12E27" />
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="mx-auto max-w-[360px]">
              <picture>
                {!config?.fotoContatoUrl && <source srcSet="/assets/grupo-recorte.webp" type="image/webp" />}
                <img src={fotoContato} width={543} height={749} alt="Integrantes do Grupo Zero 14" loading="lazy" className="w-full [filter:drop-shadow(4px_6px_0_rgba(20,23,28,.22))_drop-shadow(0_10px_16px_rgba(20,23,28,.18))]" />
              </picture>
            </div>
            <div className="flex flex-col gap-7 max-md:items-center">
              <div className="max-md:text-center">
                <span className="mb-3.5 inline-block -rotate-1 rounded-[12px_20px_12px_18px] border-[3px] border-tinta bg-azul px-5 py-0.5 font-display text-xl uppercase text-white shadow-[4px_4px_0_var(--color-tinta)]">Shows</span>
                <a href={`tel:${tel.replace(/\D/g, '')}`} className="block text-[17px] hover:text-azul">{tel}</a>
                <a href={`mailto:${emailShows}`} className="block text-[17px] hover:text-azul">{emailShows}</a>
              </div>
              <div className="max-md:text-center">
                <span className="mb-3.5 inline-block -rotate-1 rounded-[12px_20px_12px_18px] border-[3px] border-tinta bg-azul px-5 py-0.5 font-display text-xl uppercase text-white shadow-[4px_4px_0_var(--color-tinta)]">Parcerias</span>
                <a href={`mailto:${emailImprensa}`} className="block text-[17px] hover:text-azul">{emailImprensa}</a>
              </div>
              <div className="max-md:text-center">
                <p className="mb-3 font-display text-lg uppercase text-tinta">Nos siga nas redes</p>
                <div className="flex gap-3.5 max-md:justify-center">
                  <a href={instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-[52px] w-[52px] -rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-tinta text-white shadow-[4px_4px_0_rgba(20,23,28,.22)] transition hover:translate-y-[-3px] hover:rotate-0 hover:bg-azul">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.17-.4-.36-1-.42-2.2-.06-1.3-.07-1.7-.07-4.9s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.3-.28.8-.32 1.7C4 8.5 4 8.9 4 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.31.32.62.52 1.05.7.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.31.52-.62.7-1.05.12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7a2.8 2.8 0 0 0-.7-1.06 2.8 2.8 0 0 0-1.05-.7c-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" /></svg>
                  </a>
                  <a href={tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="flex h-[52px] w-[52px] rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-tinta text-white shadow-[4px_4px_0_rgba(20,23,28,.22)] transition hover:translate-y-[-3px] hover:rotate-0 hover:bg-azul">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.3-.3-3.5-1v6.1c0 3.6-2.6 5.9-5.7 5.9A5.7 5.7 0 0 1 5 14.4c0-3.4 2.9-5.7 6.2-5.3v2.6c-.4-.1-.9-.2-1.3-.2-1.5 0-2.6 1.1-2.6 2.7 0 1.6 1.1 2.7 2.6 2.7 1.6 0 2.7-1.2 2.7-2.9V3h1.9Z" /></svg>
                  </a>
                  <a href={youtube} target="_blank" rel="noopener" aria-label="YouTube" className="flex h-[52px] w-[52px] -rotate-3 items-center justify-center rounded-[13px_18px_13px_16px] border-[3px] border-tinta bg-tinta text-white shadow-[4px_4px_0_rgba(20,23,28,.22)] transition hover:translate-y-[-3px] hover:rotate-0 hover:bg-azul">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4a2.5 2.5 0 0 0-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7c.4-1.5.4-4.7.4-4.7ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECADOS ===== */}
      <section id="feedbacks" className="textura-giz relative overflow-hidden bg-[#0b0b0d] py-[84px] text-white">
        <div className="relative z-[1] mx-auto mb-9 max-w-[1160px] px-6 text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[3px] text-amarelo">Fala, torcida!</span>
          <h2 className="mt-1.5 font-display text-[clamp(40px,7vw,80px)] uppercase leading-none">Recados</h2>
        </div>

        {[recA, recB].map((linha, li) => (
          <div key={li} className="relative z-[1] overflow-hidden py-3.5 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
            <div className={`flex pl-5 ${li === 0 ? 'animate-marquee-slow' : 'animate-marquee-rev'}`}>
              {[...linha, ...linha].map((r, i) => (
                <div key={i} className={`relative mr-5 w-[clamp(224px,26vw,282px)] shrink-0 rounded-[10px_16px_10px_14px] border-[3px] border-tinta p-[24px_22px_18px] shadow-[5px_5px_0_rgba(0,0,0,.5)] before:absolute before:-top-[11px] before:left-1/2 before:z-[3] before:h-5 before:w-[66px] before:-translate-x-1/2 before:-rotate-[4deg] before:border before:border-dashed before:border-black/25 before:bg-black/[.18] ${i % 3 === 0 ? 'rotate-[-1.5deg] bg-amarelo text-tinta' : i % 3 === 1 ? 'rotate-[1.2deg] bg-white text-tinta' : 'rotate-[-.7deg] bg-azul text-white'}`}>
                  <p className="mb-3 font-mao text-lg leading-snug">"{r.mensagem}"</p>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-85">{r.nome}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="relative z-[1] mt-11 text-center">
          <button onClick={() => setModal(true)} className={btnVerMais}>Deixar recado</button>
        </div>
      </section>

      <Footer />

      {/* ===== MODAL RECADO ===== */}
      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6" onClick={() => setModal(false)}>
          <div className="relative w-full max-w-md rounded-[18px_26px_18px_24px] border-[3px] border-tinta bg-[#faf8f2] p-8 shadow-[10px_10px_0_var(--color-tinta)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(false)} aria-label="Fechar" className="absolute right-4 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-tinta bg-white text-xl leading-none hover:bg-vermelho hover:text-white">×</button>
            {recEnviado ? (
              <div className="py-4 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <h3 className="font-display text-2xl uppercase">Recado enviado!</h3>
                <p className="mt-2 text-sm text-neutral-500">Valeu! Assim que for aprovado, aparece no mural.</p>
              </div>
            ) : (
              <form onSubmit={enviarRecado}>
                <h3 className="font-display text-3xl uppercase">Deixe seu recado</h3>
                <p className="mb-5 mt-1.5 text-[13px] text-neutral-500">Manda um salve pro Zero 14!</p>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide">Seu nome</label>
                <input value={recNome} onChange={(e) => setRecNome(e.target.value)} required placeholder="Como você quer aparecer" className="mb-4 w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul" />
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide">Mensagem</label>
                <textarea value={recMsg} onChange={(e) => setRecMsg(e.target.value)} required placeholder="Escreve seu recado pro grupo..." className="mb-4 min-h-[108px] w-full resize-y rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul" />
                <button type="submit" className="w-full rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-azul py-3 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5">Enviar recado</button>
                <p className="mt-3 text-center text-xs text-neutral-500">Seu recado passa por aprovação antes de aparecer no mural.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
