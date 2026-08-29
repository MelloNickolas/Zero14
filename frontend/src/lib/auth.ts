// Helpers de sessão do admin (JWT simples no localStorage).

export function salvarSessao(token: string, nome: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('nome', nome);
}

export function obterToken(): string | null {
  return localStorage.getItem('token');
}

export function obterNome(): string {
  return localStorage.getItem('nome') || 'Admin';
}

export function estaLogado(): boolean {
  return !!localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
}
