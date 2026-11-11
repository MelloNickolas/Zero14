import { HTTPClient } from './client';
import type { Registro } from './types';

const RegistroApi = {
  async listar(): Promise<Registro[]> {
    try {
      const response = await HTTPClient.get('/Registro/ListarRegistros');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar registros:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Registro> {
    try {
      const response = await HTTPClient.get(`/Registro/ObterRegistroPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter registro:', error);
      throw error;
    }
  },

  async criar(registro: Omit<Registro, 'id'>): Promise<number> {
    try {
      const response = await HTTPClient.post('/Registro/CriarRegistro', registro);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  },

  async atualizar(id: number, registro: Omit<Registro, 'id'>): Promise<void> {
    try {
      await HTTPClient.put(`/Registro/AtualizarRegistro/${id}`, registro);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Registro/DeletarRegistro/${id}`);
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
      throw error;
    }
  },
};

export default RegistroApi;
