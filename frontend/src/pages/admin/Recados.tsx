import { useEffect, useState } from 'react';
import ComentarioApi from '../../services/comentarioApi';
import type { Comentario } from '../../services/types';

export default function AdminRecados() {
  const [itens, setItens] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);
    try { setItens(await ComentarioApi.listar()); } catch { /* */ } finally { setCarregando(false); }
  }
  useEffect(() => { carregar(); }, []);

  async function aprovar(c: Comentario) {
    try { await ComentarioApi.aprovar(c.id); await carregar(); } catch { alert('Erro ao aprovar.'); }
  }
  async function excluir(c: Comentario) {
    if (!confirm(`Excluir o recado de ${c.nome}?`)) return;
    try { await ComentarioApi.deletar(c.id); await carregar(); } catch { alert('Erro ao excluir.'); }
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-5xl uppercase text-azul">Recados</h1>

      {carregando ? (<p className="text-neutral-500">Carregando...</p>)
      : itens.length === 0 ? (<p className="rounded-2xl border-[3px] border-dashed border-tinta/40 bg-white p-10 text-center font-mao text-2xl text-neutral-400">Nenhum recado ainda.</p>)
      : (
        <div className="flex flex-col gap-4">
          {itens.map((c) => (
            <div key={c.id} className="flex flex-wrap items-start justify-between gap-4 rounded-[14px] border-[3px] border-tinta bg-white p-5 shadow-[5px_5px_0_var(--color-tinta)]">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <strong className="font-display text-lg uppercase text-tinta">{c.nome}</strong>
                  {c.aprovado
                    ? <span className="rounded-full border-2 border-verde px-2 py-0.5 text-[11px] font-bold uppercase text-verde">Aprovado</span>
                    : <span className="rounded-full border-2 border-amarelo bg-amarelo/20 px-2 py-0.5 text-[11px] font-bold uppercase text-[#9a7a00]">Pendente</span>}
                </div>
                <p className="font-mao text-lg text-neutral-700">"{c.mensagem}"</p>
                <span className="mt-1 block text-xs text-neutral-400">{c.criadoEm ? new Date(c.criadoEm).toLocaleString('pt-BR') : ''}</span>
              </div>
              <div className="flex shrink-0 gap-2">
                {!c.aprovado && <button onClick={() => aprovar(c)} className="rounded-lg border-2 border-verde px-3 py-1 font-semibold text-verde hover:bg-verde hover:text-white">Aprovar</button>}
                <button onClick={() => excluir(c)} className="rounded-lg border-2 border-vermelho px-3 py-1 font-semibold text-vermelho hover:bg-vermelho hover:text-white">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
