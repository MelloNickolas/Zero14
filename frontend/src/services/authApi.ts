import { HTTPClient } from './client';
import type { LoginResponse } from './types';

const AuthApi = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    try {
      const response = await HTTPClient.post('/Auth/Login', { email, senha });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },
};

export default AuthApi;
