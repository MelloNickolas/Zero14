import { HTTPClient } from './client';
import type { Musica } from './types';

const MusicaApi = {
  async listar(): Promise<Musica[]> {
    try {
      const response = await HTTPClient.get('/Musica/ListarMusicas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar músicas:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Musica> {
    try {
      const response = await HTTPClient.get(`/Musica/ObterMusicaPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter música:', error);
      throw error;
    }
  },

  async criar(musica: Omit<Musica, 'id'>): Promise<number> {
    try {
      const response = await HTTPClient.post('/Musica/CriarMusica', musica);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar música:', error);
      throw error;
    }
  },

  async atualizar(id: number, musica: Omit<Musica, 'id'>): Promise<void> {
    try {
      await HTTPClient.put(`/Musica/AtualizarMusica/${id}`, musica);
    } catch (error) {
      console.error('Erro ao atualizar música:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Musica/DeletarMusica/${id}`);
    } catch (error) {
      console.error('Erro ao deletar música:', error);
      throw error;
    }
  },
};

export default MusicaApi;
