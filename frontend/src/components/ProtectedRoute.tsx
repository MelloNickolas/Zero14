import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { estaLogado } from '../lib/auth';

// Envolve as rotas do /admin: se não estiver logado, manda pro login.
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!estaLogado()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
