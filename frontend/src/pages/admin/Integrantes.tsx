import { useEffect, useState, type FormEvent } from 'react';
import IntegranteApi from '../../services/integranteApi';
import type { Integrante } from '../../services/types';
import UploadImagem from '../../components/admin/UploadImagem';

type Form = { nome: string; papel: string; fotoUrl: string; descricao: string; depoimento: string; ordem: number };
const VAZIO: Form = { nome: '', papel: '', fotoUrl: '', descricao: '', depoimento: '', ordem: 0 };

export default function AdminIntegrantes() {
  const [itens, setItens] = useState<Integrante[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    try { setItens(await IntegranteApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  function abrirNovo() { setEditandoId(null); setForm(VAZIO); setErro(''); setModal(true); }
  function abrirEditar(m: Integrante) {
    setEditandoId(m.id);
    setForm({ nome: m.nome, papel: m.papel, fotoUrl: m.fotoUrl, descricao: m.descricao, depoimento: m.depoimento ?? '', ordem: m.ordem });
    setErro(''); setModal(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (!form.fotoUrl) { setErro('Envie a foto do integrante.'); return; }
    setSalvando(true); setErro('');
    const payload = { ...form, depoimento: form.depoimento || undefined };
    try {
      if (editandoId) await IntegranteApi.atualizar(editandoId, payload);
      else await IntegranteApi.criar(payload);
      setModal(false); await carregar();
    } catch (err: any) { setErro(err?.response?.data?.mensagem ?? 'Erro ao salvar.'); } finally { setSalvando(false); }
  }

  async function excluir(m: Integrante) {
    if (!confirm(`Excluir ${m.nome}?`)) return;
    try { await IntegranteApi.deletar(m.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl uppercase text-azul">Integrantes</h1>
        <button onClick={abrirNovo} className="shrink-0 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">+ Novo integrante</button>
      </div>

      {carregando ? (<p className="text-neutral-500">Carregando...</p>)
      : itens.length === 0 ? (<p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhum integrante cadastrado ainda.</p>)
      : (
        <div className="overflow-x-auto rounded-[16px] border-[3px] border-tinta bg-white shadow-[6px_6px_0_var(--color-tinta)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b-2 border-tinta/20 bg-[#faf8f2] font-display uppercase">
              <tr><th className="p-4">Foto</th><th className="p-4">Nome</th><th className="p-4">Papel</th><th className="p-4">Ordem</th><th className="p-4 text-right">Ações</th></tr>
            </thead>
            <tbody>
              {itens.map((m) => (
                <tr key={m.id} className="border-b border-tinta/10 last:border-0">
                  <td className="p-4"><img src={m.fotoUrl} alt={m.nome} className="h-12 w-12 rounded-lg border-2 border-tinta object-cover" /></td>
                  <td className="p-4 font-medium">{m.nome}</td>
                  <td className="p-4">{m.papel}</td>
                  <td className="p-4 tabular-nums">{m.ordem}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => abrirEditar(m)} className="mr-2 rounded-lg border-2 border-tinta px-3 py-1 font-semibold hover:bg-amarelo">Editar</button>
                    <button onClick={() => excluir(m)} className="rounded-lg border-2 border-vermelho px-3 py-1 font-semibold text-vermelho hover:bg-vermelho hover:text-white">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6" onClick={() => setModal(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={salvar} className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[18px_26px_18px_24px] border-[3px] border-tinta bg-[#faf8f2] p-8 shadow-[10px_10px_0_var(--color-tinta)]">
            <button type="button" onClick={() => setModal(false)} aria-label="Fechar" className="absolute right-4 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-tinta bg-white text-xl leading-none hover:bg-vermelho hover:text-white">×</button>
            <h3 className="mb-5 font-display text-3xl uppercase text-azul">{editandoId ? 'Editar integrante' : 'Novo integrante'}</h3>

            <label className={label}>Foto</label>
            <div className="mb-4"><UploadImagem valor={form.fotoUrl} onChange={(url) => setForm({ ...form, fotoUrl: url })} /></div>

            <div className="mb-4 grid grid-cols-[1fr_110px] gap-3">
              <div><label className={label}>Nome</label><input className={campo} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required /></div>
              <div><label className={label}>Ordem</label><input type="number" className={campo} value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} /></div>
            </div>

            <label className={label}>Papel / instrumento</label>
            <input className={`${campo} mb-4`} value={form.papel} onChange={(e) => setForm({ ...form, papel: e.target.value })} placeholder="ex: Voz e violão" required />

            <label className={label}>Descrição (mini-bio do card)</label>
            <textarea className={`${campo} mb-4 min-h-[70px] resize-y`} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} required />

            <label className={label}>Depoimento (frase do carrossel — opcional)</label>
            <textarea className={`${campo} mb-4 min-h-[70px] resize-y`} value={form.depoimento} onChange={(e) => setForm({ ...form, depoimento: e.target.value })} />

            {erro && <p className="mb-4 rounded-lg border-2 border-vermelho bg-vermelho/10 px-3 py-2 text-sm text-vermelho">{erro}</p>}
            <button type="submit" disabled={salvando} className="w-full rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-azul py-3 font-display text-xl uppercase text-white shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5 disabled:opacity-60">{salvando ? 'Salvando...' : 'Salvar'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
