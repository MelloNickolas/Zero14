import { useEffect, useState, type FormEvent } from 'react';
import RegistroApi from '../../services/registroApi';
import UploadImagem from '../../components/admin/UploadImagem';
import type { Registro } from '../../services/types';

type Form = { capaUrl: string; data: string; local: string; cidade: string; uf: string; linkDrive: string };
const VAZIO: Form = { capaUrl: '', data: '', local: '', cidade: '', uf: '', linkDrive: '' };

export default function AdminRegistros() {
  const [itens, setItens] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    try { setItens(await RegistroApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  function abrirNovo() { setEditandoId(null); setForm(VAZIO); setErro(''); setModal(true); }
  function abrirEditar(r: Registro) {
    setEditandoId(r.id);
    setForm({ capaUrl: r.capaUrl, data: r.data ? r.data.slice(0, 10) : '', local: r.local, cidade: r.cidade, uf: r.uf, linkDrive: r.linkDrive });
    setErro(''); setModal(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (!form.capaUrl) { setErro('Envie a foto de capa.'); return; }
    setSalvando(true); setErro('');
    try {
      if (editandoId) await RegistroApi.atualizar(editandoId, form);
      else await RegistroApi.criar(form);
      setModal(false);
      await carregar();
    } catch (err: any) {
      setErro(err?.response?.data?.mensagem ?? 'Erro ao salvar o registro.');
    } finally { setSalvando(false); }
  }

  async function excluir(r: Registro) {
    if (!confirm(`Excluir o registro "${r.local}"?`)) return;
    try { await RegistroApi.deletar(r.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl uppercase text-azul">Registros</h1>
        <button onClick={abrirNovo} className="shrink-0 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">+ Novo registro</button>
      </div>
      <p className="mb-6 text-sm text-neutral-600">Cards da página &quot;Você no Zero 14&quot;: capa do show + link do drive com as fotos e vídeos.</p>

      {carregando ? (
        <p className="text-neutral-500">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhum registro cadastrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border-[3px] border-tinta bg-white shadow-[6px_6px_0_var(--color-tinta)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b-2 border-tinta/20 bg-[#faf8f2] font-display uppercase">
              <tr>
                <th className="p-4">Capa</th><th className="p-4">Data</th><th className="p-4">Local</th><th className="p-4">Cidade</th><th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((r) => (
                <tr key={r.id} className="border-b border-tinta/10 last:border-0">
                  <td className="p-4"><img src={r.capaUrl} alt="" className="h-12 w-16 rounded-md border-2 border-tinta object-cover" /></td>
                  <td className="p-4 tabular-nums">{r.data ? new Date(r.data).toLocaleDateString('pt-BR') : '—'}</td>
                  <td className="p-4 font-medium">{r.local}</td>
                  <td className="p-4">{r.cidade} — {r.uf}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => abrirEditar(r)} className="mr-2 rounded-lg border-2 border-tinta px-3 py-1 font-semibold hover:bg-amarelo">Editar</button>
                    <button onClick={() => excluir(r)} className="rounded-lg border-2 border-vermelho px-3 py-1 font-semibold text-vermelho hover:bg-vermelho hover:text-white">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== MODAL ===== */}
      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6" onClick={() => setModal(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={salvar} className="relative w-full max-w-lg rounded-[18px_26px_18px_24px] border-[3px] border-tinta bg-[#faf8f2] p-8 shadow-[10px_10px_0_var(--color-tinta)] max-h-[90dvh] overflow-y-auto">
            <button type="button" onClick={() => setModal(false)} aria-label="Fechar" className="absolute right-4 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-tinta bg-white text-xl leading-none hover:bg-vermelho hover:text-white">×</button>
            <h3 className="mb-5 font-display text-3xl uppercase text-azul">{editandoId ? 'Editar registro' : 'Novo registro'}</h3>

            <label className={label}>Foto de capa</label>
            <UploadImagem valor={form.capaUrl} onChange={(url) => setForm({ ...form, capaUrl: url })} />
            <p className="mb-4 mt-2 text-xs text-neutral-500">Recomendado: <strong>800 × 600 px</strong> (proporção 4:3, na horizontal). A imagem é cortada para preencher o card.</p>

            <label className={label}>Data do show</label>
            <input type="date" className={`${campo} mb-4`} value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />

            <label className={label}>Local do show</label>
            <input className={`${campo} mb-4`} value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} placeholder="Ex.: Oficina Bar" required />

            <div className="mb-4 grid grid-cols-[1fr_90px] gap-3">
              <div><label className={label}>Cidade</label><input className={campo} value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} required /></div>
              <div><label className={label}>UF</label><input className={campo} maxLength={2} value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })} required /></div>
            </div>

            <label className={label}>Link do drive</label>
            <input type="url" className={`${campo} mb-4`} value={form.linkDrive} onChange={(e) => setForm({ ...form, linkDrive: e.target.value })} placeholder="https://drive.google.com/..." required />

            {erro && <p className="mb-4 rounded-lg border-2 border-vermelho bg-vermelho/10 px-3 py-2 text-sm text-vermelho">{erro}</p>}

            <button type="submit" disabled={salvando} className="w-full rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-azul py-3 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5 disabled:opacity-60">
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
