import { useEffect, useState, type FormEvent } from 'react';
import ConfiguracaoApi from '../../services/configuracaoApi';

type Form = {
  telefone: string; emailShows: string; emailImprensa: string;
  instagram: string; youtube: string; spotify: string; biografiaTexto: string;
};
const VAZIO: Form = { telefone: '', emailShows: '', emailImprensa: '', instagram: '', youtube: '', spotify: '', biografiaTexto: '' };

export default function AdminContato() {
  const [form, setForm] = useState<Form>(VAZIO);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    ConfiguracaoApi.obter()
      .then((c) => setForm({
        telefone: c.telefone ?? '', emailShows: c.emailShows ?? '', emailImprensa: c.emailImprensa ?? '',
        instagram: c.instagram ?? '', youtube: c.youtube ?? '', spotify: c.spotify ?? '', biografiaTexto: c.biografiaTexto ?? '',
      }))
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setSalvando(true); setMsg('');
    try { await ConfiguracaoApi.atualizar(form); setMsg('Alterações salvas! ✅'); }
    catch { setMsg('Erro ao salvar.'); }
    finally { setSalvando(false); setTimeout(() => setMsg(''), 3000); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  if (carregando) return <p className="text-neutral-500">Carregando...</p>;

  return (
    <div>
      <h1 className="mb-6 font-display text-5xl uppercase text-azul">Contato</h1>

      <form onSubmit={salvar} className="max-w-2xl rounded-[18px] border-[3px] border-tinta bg-white p-6 shadow-[6px_6px_0_var(--color-tinta)] md:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Telefone</label><input className={campo} value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} placeholder="(11) 91234-5678" /></div>
          <div><label className={label}>E-mail (shows)</label><input type="email" className={campo} value={form.emailShows} onChange={(e) => setForm({ ...form, emailShows: e.target.value })} /></div>
          <div><label className={label}>E-mail (parcerias)</label><input type="email" className={campo} value={form.emailImprensa} onChange={(e) => setForm({ ...form, emailImprensa: e.target.value })} /></div>
          <div><label className={label}>Instagram (URL)</label><input className={campo} value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} /></div>
          <div><label className={label}>YouTube (URL)</label><input className={campo} value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} /></div>
          <div><label className={label}>Spotify (URL)</label><input className={campo} value={form.spotify} onChange={(e) => setForm({ ...form, spotify: e.target.value })} /></div>
        </div>

        <label className={`${label} mt-4`}>Texto da biografia</label>
        <textarea className={`${campo} min-h-[160px] resize-y`} value={form.biografiaTexto} onChange={(e) => setForm({ ...form, biografiaTexto: e.target.value })} placeholder="Conte a história do grupo..." />

        <div className="mt-6 flex items-center gap-4">
          <button type="submit" disabled={salvando} className="rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-azul px-8 py-3 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5 disabled:opacity-60">{salvando ? 'Salvando...' : 'Salvar'}</button>
          {msg && <span className="font-semibold text-verde">{msg}</span>}
        </div>
      </form>
    </div>
  );
}
