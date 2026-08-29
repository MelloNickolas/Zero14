import axios from 'axios';

// baseURL vem do .env (VITE_API_URL); cai no localhost:5023 se não tiver.
export const HTTPClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5023',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// Interceptor de REQUISIÇÃO: roda ANTES de cada chamada sair do front.
// Adiciona automaticamente o token JWT no header Authorization.
HTTPClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // o backend espera exatamente: Authorization: Bearer SEU_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPOSTA: JWT simples (sem refresh token).
// Se a API responder 401 (não autenticado / token expirado) DENTRO da área admin,
// limpa o token e manda pro login. No site público não redireciona.
HTTPClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
