import { HTTPClient } from './client';
import type { Integrante } from './types';

const IntegranteApi = {
  async listar(): Promise<Integrante[]> {
    try {
      const response = await HTTPClient.get('/Integrante/ListarIntegrantes');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar integrantes:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Integrante> {
    try {
      const response = await HTTPClient.get(`/Integrante/ObterIntegrantePorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter integrante:', error);
      throw error;
    }
  },

  async criar(integrante: Omit<Integrante, 'id'>): Promise<number> {
    try {
      const response = await HTTPClient.post('/Integrante/CriarIntegrante', integrante);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar integrante:', error);
      throw error;
    }
  },

  async atualizar(id: number, integrante: Omit<Integrante, 'id'>): Promise<void> {
    try {
      await HTTPClient.put(`/Integrante/AtualizarIntegrante/${id}`, integrante);
    } catch (error) {
      console.error('Erro ao atualizar integrante:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Integrante/DeletarIntegrante/${id}`);
    } catch (error) {
      console.error('Erro ao deletar integrante:', error);
      throw error;
    }
  },
};

export default IntegranteApi;
