import { HTTPClient } from './client';
import type { Evento } from './types';

const EventoApi = {
  async listar(): Promise<Evento[]> {
    try {
      const response = await HTTPClient.get('/Evento/ListarEventos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Evento> {
    try {
      const response = await HTTPClient.get(`/Evento/ObterEventoPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter evento:', error);
      throw error;
    }
  },

  async criar(evento: Omit<Evento, 'id'>): Promise<number> {
    try {
      const response = await HTTPClient.post('/Evento/CriarEvento', evento);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  },

  async atualizar(id: number, evento: Omit<Evento, 'id'>): Promise<void> {
    try {
      await HTTPClient.put(`/Evento/AtualizarEvento/${id}`, evento);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Evento/DeletarEvento/${id}`);
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      throw error;
    }
  },
};

export default EventoApi;
