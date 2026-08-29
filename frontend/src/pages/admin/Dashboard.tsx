import { Link } from 'react-router-dom';

const CARDS = [
  { to: '/admin/shows', titulo: 'Shows', desc: 'Cadastre e edite a agenda de shows.' },
  { to: '/admin/fotos', titulo: 'Fotos', desc: 'Suba e organize a galeria.' },
  { to: '/admin/musicas', titulo: 'Músicas', desc: 'Clipes e vídeos do grupo.' },
  { to: '/admin/integrantes', titulo: 'Integrantes', desc: 'Membros, fotos e depoimentos.' },
  { to: '/admin/recados', titulo: 'Recados', desc: 'Aprove ou recuse os recados dos fãs.' },
  { to: '/admin/contato', titulo: 'Contato', desc: 'Telefone, e-mails, redes e bio.' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 font-display text-5xl uppercase text-azul">Painel Zero 14</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Link
            key={c.to}
            to={c.to}
            className={`block rounded-[18px_28px_18px_26px] border-[3px] border-tinta bg-white p-6 shadow-[6px_6px_0_var(--color-tinta)] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_var(--color-tinta)] ${i % 2 ? 'rotate-[.6deg]' : '-rotate-[.6deg]'}`}
          >
            <h2 className="font-display text-2xl uppercase text-azul">{c.titulo}</h2>
            <p className="mt-2 text-sm text-neutral-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
