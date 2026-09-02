import { useState, type ChangeEvent } from 'react';
import UploadApi from '../../services/uploadApi';

export default function UploadImagem({ valor, onChange }: { valor: string; onChange: (url: string) => void }) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function selecionar(e: ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    if (arquivo.size > 10 * 1024 * 1024) {
      setErro('Imagem muito grande (máx. 10 MB). Reduza o tamanho e tente de novo.');
      e.target.value = '';
      return;
    }
    setEnviando(true); setErro('');
    try {
      const url = await UploadApi.enviarImagem(arquivo);
      onChange(url);
    } catch {
      setErro('Falha no upload. Tente outra imagem.');
    } finally { setEnviando(false); }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {valor ? (
          <img src={valor} alt="Prévia" className="h-16 w-16 rounded-lg border-2 border-tinta object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-tinta/40 text-xs text-neutral-400">sem foto</div>
        )}
        <label className="cursor-pointer rounded-[10px_16px_10px_14px] border-[3px] border-tinta bg-white px-4 py-2 font-display text-sm uppercase shadow-[3px_3px_0_var(--color-tinta)] transition hover:-translate-y-0.5">
          {enviando ? 'Enviando...' : valor ? 'Trocar imagem' : 'Enviar imagem'}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={selecionar} disabled={enviando} />
        </label>
      </div>
      {erro && <p className="mt-2 text-sm text-vermelho">{erro}</p>}
    </div>
  );
}
