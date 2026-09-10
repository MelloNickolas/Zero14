import { HTTPClient } from './client';
import type { Patrocinador } from './types';

type PatrocinadorPayload = { nome: string; logoUrl: string; link: string; ordem: number };

const PatrocinadorApi = {
  async listar(): Promise<Patrocinador[]> {
    try {
      const response = await HTTPClient.get('/Patrocinador/ListarPatrocinadores');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar patrocinadores:', error);
      throw error;
    }
  },

  async criar(patrocinador: PatrocinadorPayload): Promise<number> {
    try {
      const response = await HTTPClient.post('/Patrocinador/CriarPatrocinador', patrocinador);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar patrocinador:', error);
      throw error;
    }
  },

  async atualizar(id: number, patrocinador: PatrocinadorPayload): Promise<void> {
    try {
      await HTTPClient.put(`/Patrocinador/AtualizarPatrocinador/${id}`, patrocinador);
    } catch (error) {
      console.error('Erro ao atualizar patrocinador:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Patrocinador/DeletarPatrocinador/${id}`);
    } catch (error) {
      console.error('Erro ao deletar patrocinador:', error);
      throw error;
    }
  },

  // registra +1 clique (site público) — fire-and-forget
  async registrarClique(id: number): Promise<void> {
    try {
      await HTTPClient.post(`/Patrocinador/RegistrarClique/${id}`);
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    }
  },

  async reordenar(idsNaOrdem: number[]): Promise<void> {
    try {
      await HTTPClient.put('/Patrocinador/ReordenarPatrocinadores', idsNaOrdem);
    } catch (error) {
      console.error('Erro ao reordenar patrocinadores:', error);
      throw error;
    }
  },
};

export default PatrocinadorApi;
