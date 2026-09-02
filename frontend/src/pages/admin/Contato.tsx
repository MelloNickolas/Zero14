import { useEffect, useState, type FormEvent } from 'react';
import ConfiguracaoApi from '../../services/configuracaoApi';
import UploadImagem from '../../components/admin/UploadImagem';

type Form = {
  telefone: string; whatsApp: string; emailShows: string; emailImprensa: string;
  instagram: string; youtube: string; spotify: string;
  portfolio: string; fotoContatoUrl: string; biografiaTexto: string;
};
const VAZIO: Form = { telefone: '', whatsApp: '', emailShows: '', emailImprensa: '', instagram: '', youtube: '', spotify: '', portfolio: '', fotoContatoUrl: '', biografiaTexto: '' };

export default function AdminContato() {
  const [form, setForm] = useState<Form>(VAZIO);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    ConfiguracaoApi.obter()
      .then((c) => setForm({
        telefone: c.telefone ?? '', whatsApp: c.whatsApp ?? '', emailShows: c.emailShows ?? '', emailImprensa: c.emailImprensa ?? '',
        instagram: c.instagram ?? '', youtube: c.youtube ?? '', spotify: c.spotify ?? '',
        portfolio: c.portfolio ?? '', fotoContatoUrl: c.fotoContatoUrl ?? '', biografiaTexto: c.biografiaTexto ?? '',
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
          <div>
            <label className={label}>WhatsApp (botão dos shows)</label>
            <input className={campo} value={form.whatsApp} onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} placeholder="(11) 91234-5678" />
            <p className="mt-1 text-xs text-neutral-500">Nº que recebe o contato dos shows. Pode ter DDD só (o Brasil +55 é adicionado sozinho).</p>
          </div>
          <div><label className={label}>E-mail (shows)</label><input type="email" className={campo} value={form.emailShows} onChange={(e) => setForm({ ...form, emailShows: e.target.value })} /></div>
          <div><label className={label}>E-mail (parcerias)</label><input type="email" className={campo} value={form.emailImprensa} onChange={(e) => setForm({ ...form, emailImprensa: e.target.value })} /></div>
          <div><label className={label}>Instagram (URL)</label><input className={campo} value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} /></div>
          <div><label className={label}>YouTube (URL)</label><input className={campo} value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} /></div>
          <div><label className={label}>Spotify (URL)</label><input className={campo} value={form.spotify} onChange={(e) => setForm({ ...form, spotify: e.target.value })} /></div>
          <div><label className={label}>Portfolio (URL da navbar)</label><input className={campo} value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} placeholder="https://..." /></div>
        </div>

        <label className={`${label} mt-4`}>Foto da seção de contato</label>
        <UploadImagem valor={form.fotoContatoUrl} onChange={(url) => setForm({ ...form, fotoContatoUrl: url })} />
        <p className="mt-1 text-xs text-neutral-500">PNG, JPG ou WebP (recomendado PNG com fundo transparente). Máx. 10&nbsp;MB.</p>

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
