import { useEffect, useState, type FormEvent } from 'react';
import PatrocinadorApi from '../../services/patrocinadorApi';
import UploadImagem from '../../components/admin/UploadImagem';
import type { Patrocinador } from '../../services/types';

type Form = { nome: string; link: string; logoUrl: string };
const VAZIO: Form = { nome: '', link: '', logoUrl: '' };

export default function AdminPatrocinadores() {
  const [itens, setItens] = useState<Patrocinador[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    try { setItens(await PatrocinadorApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  function abrirNovo() { setEditandoId(null); setForm(VAZIO); setErro(''); setModal(true); }
  function abrirEditar(p: Patrocinador) {
    setEditandoId(p.id);
    setForm({ nome: p.nome, link: p.link ?? '', logoUrl: p.logoUrl });
    setErro(''); setModal(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (!form.logoUrl) { setErro('Envie a logo do patrocinador.'); return; }
    setSalvando(true); setErro('');
    try {
      if (editandoId) {
        const atual = itens.find((p) => p.id === editandoId);
        await PatrocinadorApi.atualizar(editandoId, { ...form, ordem: atual?.ordem ?? 0 });
      } else {
        await PatrocinadorApi.criar({ ...form, ordem: itens.length });
      }
      setModal(false);
      await carregar();
    } catch (err: any) {
      setErro(err?.response?.data?.mensagem ?? 'Erro ao salvar o patrocinador.');
    } finally { setSalvando(false); }
  }

  async function excluir(p: Patrocinador) {
    if (!confirm(`Excluir o patrocinador "${p.nome}"?`)) return;
    try { await PatrocinadorApi.deletar(p.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  async function mover(index: number, dir: -1 | 1) {
    const alvo = index + dir;
    if (alvo < 0 || alvo >= itens.length) return;
    const novos = [...itens];
    [novos[index], novos[alvo]] = [novos[alvo], novos[index]];
    setItens(novos); // otimista
    try { await PatrocinadorApi.reordenar(novos.map((p) => p.id)); }
    catch { await carregar(); }
  }

  const campo = 'w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul';
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl uppercase text-azul">Patrocinadores</h1>
        <button onClick={abrirNovo} className="shrink-0 -rotate-1 rounded-[12px_18px_12px_16px] border-[3px] border-tinta bg-verde px-5 py-2.5 font-display uppercase text-white shadow-[4px_4px_0_var(--color-tinta)] transition hover:rotate-0 hover:-translate-y-0.5">+ Novo patrocinador</button>
      </div>

      {carregando ? (
        <p className="text-neutral-500">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhum patrocinador cadastrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border-[3px] border-tinta bg-white shadow-[6px_6px_0_var(--color-tinta)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b-2 border-tinta/20 bg-[#faf8f2] font-display uppercase">
              <tr>
                <th className="p-4">Ordem</th><th className="p-4">Logo</th><th className="p-4">Nome</th><th className="p-4 text-center">Cliques</th><th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((p, i) => (
                <tr key={p.id} className="border-b border-tinta/10 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => mover(i, -1)} disabled={i === 0} aria-label="Subir" className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-tinta font-bold disabled:opacity-30 hover:bg-amarelo">↑</button>
                      <button onClick={() => mover(i, 1)} disabled={i === itens.length - 1} aria-label="Descer" className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-tinta font-bold disabled:opacity-30 hover:bg-amarelo">↓</button>
                    </div>
                  </td>
                  <td className="p-4"><img src={p.logoUrl} alt={p.nome} className="h-12 w-12 rounded-lg border-2 border-tinta bg-azul object-contain p-1" /></td>
                  <td className="p-4 font-medium">{p.nome}</td>
                  <td className="p-4 text-center tabular-nums font-semibold text-azul">{p.cliques}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => abrirEditar(p)} className="mr-2 rounded-lg border-2 border-tinta px-3 py-1 font-semibold hover:bg-amarelo">Editar</button>
                    <button onClick={() => excluir(p)} className="rounded-lg border-2 border-vermelho px-3 py-1 font-semibold text-vermelho hover:bg-vermelho hover:text-white">Excluir</button>
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
            <h3 className="mb-5 font-display text-3xl uppercase text-azul">{editandoId ? 'Editar patrocinador' : 'Novo patrocinador'}</h3>

            <label className={label}>Nome do patrocinador</label>
            <input className={`${campo} mb-4`} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />

            <label className={label}>Link do Instagram</label>
            <input className={`${campo} mb-4`} value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://instagram.com/..." />

            <label className={label}>Logo (proporção 1:1)</label>
            <UploadImagem valor={form.logoUrl} onChange={(url) => setForm({ ...form, logoUrl: url })} fundoEscuro />
            <p className="mb-4 mt-1 text-xs text-neutral-500">Use uma imagem quadrada (1:1). PNG, JPG ou WebP. Máx. 10&nbsp;MB.</p>

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
