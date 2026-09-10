import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { obterNome, logout } from '../../lib/auth';

const SECOES = [
  { to: '/admin', label: 'Início', fim: true },
  { to: '/admin/shows', label: 'Shows' },
  { to: '/admin/fotos', label: 'Fotos' },
  { to: '/admin/musicas', label: 'Músicas' },
  { to: '/admin/integrantes', label: 'Integrantes' },
  { to: '/admin/patrocinadores', label: 'Patrocinadores' },
  { to: '/admin/recados', label: 'Recados' },
  { to: '/admin/contato', label: 'Contato' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);

  function sair() {
    logout();
    navigate('/admin/login');
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-[10px_16px_10px_14px] border-[3px] px-4 py-2.5 font-display text-lg uppercase transition ${
      isActive
        ? 'border-tinta bg-azul text-white shadow-[4px_4px_0_var(--color-tinta)]'
        : 'border-transparent text-tinta hover:border-tinta hover:bg-white'
    }`;

  const nav = (
    <nav className="flex flex-col gap-2">
      {SECOES.map((s) => (
        <NavLink key={s.to} to={s.to} end={s.fim} className={linkCls} onClick={() => setAberto(false)}>
          {s.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-creme md:pl-[260px]">
      {/* ===== SIDEBAR (desktop) ===== */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r-[3px] border-tinta bg-[#faf8f2] p-6 md:flex">
        <Link to="/" className="mb-8 block"><img src="/assets/logo-preta-nav.png" alt="Grupo Zero 14" className="h-12 w-auto" /></Link>
        {nav}
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link to="/" className="block rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-white px-4 py-2 text-center font-display uppercase shadow-[3px_3px_0_var(--color-tinta)] transition hover:-translate-y-0.5">Ver site</Link>
          <button onClick={sair} className="block rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-vermelho px-4 py-2 text-center font-display uppercase text-white shadow-[3px_3px_0_var(--color-tinta)] transition hover:-translate-y-0.5">Sair</button>
        </div>
      </aside>

      {/* ===== TOPBAR (mobile) ===== */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b-[3px] border-tinta bg-[#faf8f2] px-5 py-3 md:hidden">
        <img src="/assets/logo-preta-nav.png" alt="Grupo Zero 14" className="h-9 w-auto" />
        <button onClick={() => setAberto((v) => !v)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-tinta">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </header>
      {aberto && (
        <div className="border-b-[3px] border-tinta bg-[#faf8f2] p-5 md:hidden">
          {nav}
          <div className="mt-4 flex gap-2">
            <Link to="/" className="flex-1 rounded-lg border-[3px] border-tinta bg-white px-4 py-2 text-center font-display uppercase">Ver site</Link>
            <button onClick={sair} className="flex-1 rounded-lg border-[3px] border-tinta bg-vermelho px-4 py-2 text-center font-display uppercase text-white">Sair</button>
          </div>
        </div>
      )}

      {/* ===== CONTEÚDO ===== */}
      <main className="mx-auto max-w-5xl p-6 md:p-10">
        <p className="mb-6 text-sm text-neutral-500">Olá, <strong className="text-tinta">{obterNome()}</strong> 👋</p>
        <Outlet />
      </main>
    </div>
  );
}
