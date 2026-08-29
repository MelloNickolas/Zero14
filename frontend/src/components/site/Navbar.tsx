import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export type NavItem = { label: string; to: string; tipo: 'route' | 'anchor' | 'ext'; ativo?: boolean };

// Nav padrão = index.html do protótipo
const ESQUERDA_PADRAO: NavItem[] = [
  { label: 'Biografia', to: '/biografia', tipo: 'route' },
  { label: 'Agenda', to: '#agenda', tipo: 'anchor' },
  { label: 'Fotos', to: '#fotos', tipo: 'anchor' },
];
const DIREITA_PADRAO: NavItem[] = [
  { label: 'Contato', to: '#contato', tipo: 'anchor' },
  { label: 'Feedbacks', to: '#feedbacks', tipo: 'anchor' },
  { label: 'Instagram', to: 'https://www.instagram.com/grupozero14/', tipo: 'ext' },
];

export default function Navbar({
  variant = 'solid',
  esquerda = ESQUERDA_PADRAO,
  direita = DIREITA_PADRAO,
  heroRatio = 1,
}: {
  variant?: 'hero' | 'solid';
  esquerda?: NavItem[];
  direita?: NavItem[];
  heroRatio?: number; // fração da viewport do cabeçalho (hero=1, sub-páginas ~0.5)
}) {
  const [solido, setSolido] = useState(variant === 'solid');
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (variant !== 'hero') return;
    const onScroll = () => setSolido(window.scrollY > window.innerHeight * heroRatio - 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant, heroRatio]);

  const linkDesktop = (ativo?: boolean) =>
    'relative py-1.5 text-[15px] font-medium whitespace-nowrap transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:transition-all hover:after:w-full ' +
    (ativo ? 'after:w-full ' : 'after:w-0 ') +
    (solido
      ? 'text-tinta hover:text-azul after:bg-azul'
      : 'text-white [text-shadow:0_1px_6px_rgba(0,0,0,.35)] hover:text-vermelho after:bg-vermelho');

  const renderLink = (l: NavItem, cls: string, onClick?: () => void) => {
    if (l.tipo === 'route') return <Link key={l.label} to={l.to} className={cls} onClick={onClick}>{l.label}</Link>;
    if (l.tipo === 'ext') return <a key={l.label} href={l.to} target="_blank" rel="noopener" className={cls} onClick={onClick}>{l.label}</a>;
    return <a key={l.label} href={l.to} className={cls} onClick={onClick}>{l.label}</a>;
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        solido ? 'border-b border-[#ececf0] bg-white shadow-[0_1px_10px_rgba(0,0,0,.06)]' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[92px] max-w-[1240px] items-center px-7">
        <button
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          className={`flex h-11 w-11 items-center justify-center min-[901px]:hidden ${solido ? 'text-tinta' : 'text-white [filter:drop-shadow(0_1px_4px_rgba(0,0,0,.4))]'}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>

        <div className="hidden flex-1 items-center justify-end gap-[30px] min-[901px]:flex">
          {esquerda.map((l) => renderLink(l, linkDesktop(l.ativo)))}
        </div>

        <Link to="/" className="mx-auto flex shrink-0 items-center min-[901px]:mx-6" aria-label="Grupo Zero 14 - início">
          <img src={solido ? '/assets/logo-preta-nav.png' : '/assets/logo-branca-nav.png'} alt="Grupo Zero 14" className="h-14 w-auto" />
        </Link>

        <div className="hidden flex-1 items-center justify-start gap-[30px] min-[901px]:flex">
          {direita.map((l) => renderLink(l, linkDesktop(l.ativo)))}
        </div>

        <span className="w-11 min-[901px]:hidden" aria-hidden="true" />
      </div>

      <div
        className={`overflow-hidden bg-white transition-all duration-300 min-[901px]:hidden ${
          aberto ? 'max-h-[480px] border-b border-[#ececf0] shadow-[0_12px_20px_rgba(0,0,0,.1)]' : 'max-h-0'
        }`}
      >
        <div className="px-7 py-1.5">
          {[...esquerda, ...direita].map((l) =>
            renderLink(l, 'block w-full border-b border-[#f0f0f3] py-3.5 text-[16px] text-tinta last:border-0 hover:text-azul', () => setAberto(false))
          )}
        </div>
      </div>
    </nav>
  );
}
