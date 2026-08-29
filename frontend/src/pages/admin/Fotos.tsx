import { useEffect, useState, type FormEvent } from 'react';
import FotoApi from '../../services/fotoApi';
import type { Foto } from '../../services/types';
import UploadImagem from '../../components/admin/UploadImagem';

type Form = { url: string; legenda: string; ordem: number };
const VAZIO: Form = { url: '', legenda: '', ordem: 0 };

export default function AdminFotos() {
  const [itens, setItens] = useState<Foto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    try { setItens(await FotoApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  function abrirNovo() { setEditandoId(null); setForm(VAZIO); setErro(''); setModal(true); }
  function abrirEditar(f: Foto) { setEditandoId(f.id); setForm({ url: f.url, legenda: f.legenda ?? '', ordem: f.ordem }); setErro(''); setModal(true); }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (!form.url) { setErro('Envie uma imagem primeiro.'); return; }
    setSalvando(true); setErro('');
    const payload = { ...form, legenda: form.legenda || undefined };
    try {
      if (editandoId) await FotoApi.atualizar(editandoId, payload);
      else await FotoApi.criar(payload);
      setModal(false); await carregar();
    } catch (err: any) { setErro(err?.response?.data?.mensagem ?? 'Erro ao salvar.'); } finally { setSalvando(false); }
  }

  async function excluir(f: Foto) {
    if (!confirm('Excluir esta foto?')) return;
    try { await FotoApi.deletar(f.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl uppercase text-azul">Fotos</h1>
        <button onClick={abrirNovo} className="shrink-0 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">+ Nova foto</button>
      </div>

      {carregando ? (<p className="text-neutral-500">Carregando...</p>)
      : itens.length === 0 ? (<p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhuma foto na galeria ainda.</p>)
      : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {itens.map((f) => (
            <div key={f.id} className="overflow-hidden rounded-[12px] border-[3px] border-tinta bg-white shadow-[5px_5px_0_var(--color-tinta)]">
              <img src={f.url} alt={f.legenda || 'Foto'} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-1 p-2">
                <span className="truncate text-xs text-neutral-500">{f.legenda || `#${f.ordem}`}</span>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => abrirEditar(f)} className="rounded border-2 border-tinta px-2 py-0.5 text-xs font-semibold hover:bg-amarelo">Editar</button>
                  <button onClick={() => excluir(f)} className="rounded border-2 border-vermelho px-2 py-0.5 text-xs font-semibold text-vermelho hover:bg-vermelho hover:text-white">×</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6" onClick={() => setModal(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={salvar} className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[18px_26px_18px_24px] border-[3px] border-tinta bg-[#faf8f2] p-8 shadow-[10px_10px_0_var(--color-tinta)]">
            <button type="button" onClick={() => setModal(false)} aria-label="Fechar" className="absolute right-4 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-tinta bg-white text-xl leading-none hover:bg-vermelho hover:text-white">×</button>
            <h3 className="mb-5 font-display text-3xl uppercase text-azul">{editandoId ? 'Editar foto' : 'Nova foto'}</h3>

            <label className={label}>Imagem</label>
            <div className="mb-4"><UploadImagem valor={form.url} onChange={(url) => setForm({ ...form, url })} /></div>

            <label className={label}>Legenda (opcional)</label>
            <input className={`${campo} mb-4`} value={form.legenda} onChange={(e) => setForm({ ...form, legenda: e.target.value })} />

            <label className={label}>Ordem</label>
            <input type="number" className={`${campo} mb-4`} value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} />

            {erro && <p className="mb-4 rounded-lg border-2 border-vermelho bg-vermelho/10 px-3 py-2 text-sm text-vermelho">{erro}</p>}
            <button type="submit" disabled={salvando} className="w-full rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-azul py-3 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5 disabled:opacity-60">{salvando ? 'Salvando...' : 'Salvar'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
