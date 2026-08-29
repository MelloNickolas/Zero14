import { HTTPClient } from './client';
import type { Foto } from './types';

const FotoApi = {
  async listar(): Promise<Foto[]> {
    try {
      const response = await HTTPClient.get('/Foto/ListarFotos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar fotos:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Foto> {
    try {
      const response = await HTTPClient.get(`/Foto/ObterFotoPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter foto:', error);
      throw error;
    }
  },

  async criar(foto: Omit<Foto, 'id'>): Promise<number> {
    try {
      const response = await HTTPClient.post('/Foto/CriarFoto', foto);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar foto:', error);
      throw error;
    }
  },

  async atualizar(id: number, foto: Omit<Foto, 'id'>): Promise<void> {
    try {
      await HTTPClient.put(`/Foto/AtualizarFoto/${id}`, foto);
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Foto/DeletarFoto/${id}`);
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      throw error;
    }
  },
};

export default FotoApi;
