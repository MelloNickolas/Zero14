import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../services/authApi';
import { salvarSessao } from '../../lib/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const resp = await AuthApi.login(email, senha);
      salvarSessao(resp.token, resp.nome);
      navigate('/admin');
    } catch {
      setErro('Usuário ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="textura-giz relative flex min-h-dvh items-center justify-center overflow-hidden bg-azul px-6">
      <form
        onSubmit={entrar}
        className="relative z-10 w-full max-w-sm -rotate-1 rounded-[18px_26px_18px_24px] border-[3px] border-tinta bg-creme p-8 shadow-[10px_10px_0_var(--color-tinta)]"
      >
        <h1 className="text-center font-display text-4xl uppercase text-azul">Painel Zero 14</h1>
        <p className="mb-6 mt-1 text-center text-sm text-neutral-500">Área do administrador</p>

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          className="mb-4 w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul"
        />

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
          className="mb-4 w-full rounded-[10px] border-2 border-tinta bg-white px-3 py-2.5 outline-none focus:border-azul"
        />

        {erro && (
          <p role="alert" className="mb-4 rounded-lg border-2 border-vermelho bg-vermelho/10 px-3 py-2 text-sm text-vermelho">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-[14px_22px_14px_20px] border-[3px] border-tinta bg-amarelo py-3 font-display text-xl uppercase text-tinta shadow-[5px_5px_0_var(--color-tinta)] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
