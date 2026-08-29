import { useEffect, useState, type FormEvent } from 'react';
import EventoApi from '../../services/eventoApi';
import type { Evento } from '../../services/types';

type Form = { nomeEvento: string; data: string; cidade: string; uf: string; local: string; linkIngresso: string };
const VAZIO: Form = { nomeEvento: '', data: '', cidade: '', uf: '', local: '', linkIngresso: '' };

export default function AdminShows() {
  const [itens, setItens] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    try { setItens(await EventoApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  function abrirNovo() { setEditandoId(null); setForm(VAZIO); setErro(''); setModal(true); }
  function abrirEditar(ev: Evento) {
    setEditandoId(ev.id);
    setForm({ nomeEvento: ev.nomeEvento, data: ev.data ? ev.data.slice(0, 16) : '', cidade: ev.cidade, uf: ev.uf, local: ev.local, linkIngresso: ev.linkIngresso ?? '' });
    setErro(''); setModal(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setSalvando(true); setErro('');
    const payload = { ...form, linkIngresso: form.linkIngresso || undefined };
    try {
      if (editandoId) await EventoApi.atualizar(editandoId, payload);
      else await EventoApi.criar(payload);
      setModal(false);
      await carregar();
    } catch (err: any) {
      setErro(err?.response?.data?.mensagem ?? 'Erro ao salvar o show.');
    } finally { setSalvando(false); }
  }

  async function excluir(ev: Evento) {
    if (!confirm(`Excluir o show "${ev.nomeEvento}"?`)) return;
    try { await EventoApi.deletar(ev.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl uppercase text-azul">Shows</h1>
        <button onClick={abrirNovo} className="shrink-0 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">+ Novo show</button>
      </div>

      {carregando ? (
        <p className="text-neutral-500">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhum show cadastrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border-[3px] border-tinta bg-white shadow-[6px_6px_0_var(--color-tinta)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b-2 border-tinta/20 bg-[#faf8f2] font-display uppercase">
              <tr>
                <th className="p-4">Data</th><th className="p-4">Evento</th><th className="p-4">Cidade</th><th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((ev) => (
                <tr key={ev.id} className="border-b border-tinta/10 last:border-0">
                  <td className="p-4 tabular-nums">{ev.data ? new Date(ev.data).toLocaleDateString('pt-BR') : '—'}</td>
                  <td className="p-4 font-medium">{ev.nomeEvento}</td>
                  <td className="p-4">{ev.cidade} — {ev.uf}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => abrirEditar(ev)} className="mr-2 rounded-lg border-2 border-tinta px-3 py-1 font-semibold hover:bg-amarelo">Editar</button>
                    <button onClick={() => excluir(ev)} className="rounded-lg border-2 border-vermelho px-3 py-1 font-semibold text-vermelho hover:bg-vermelho hover:text-white">Excluir</button>
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
            <h3 className="mb-5 font-display text-3xl uppercase text-azul">{editandoId ? 'Editar show' : 'Novo show'}</h3>

            <label className={label}>Nome do evento</label>
            <input className={`${campo} mb-4`} value={form.nomeEvento} onChange={(e) => setForm({ ...form, nomeEvento: e.target.value })} required />

            <label className={label}>Data e hora</label>
            <input type="datetime-local" className={`${campo} mb-4`} value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />

            <div className="mb-4 grid grid-cols-[1fr_90px] gap-3">
              <div><label className={label}>Cidade</label><input className={campo} value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} required /></div>
              <div><label className={label}>UF</label><input className={campo} maxLength={2} value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })} required /></div>
            </div>

            <label className={label}>Local</label>
            <input className={`${campo} mb-4`} value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} required />

            <label className={label}>Link do ingresso (opcional)</label>
            <input className={`${campo} mb-4`} value={form.linkIngresso} onChange={(e) => setForm({ ...form, linkIngresso: e.target.value })} placeholder="https://..." />

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
