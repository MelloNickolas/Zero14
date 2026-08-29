import { HTTPClient } from './client';
import type { Comentario } from './types';

const ComentarioApi = {
  // público: fã envia o recado (nasce pendente)
  async criar(nome: string, mensagem: string): Promise<number> {
    try {
      const response = await HTTPClient.post('/Comentario/CriarComentario', { nome, mensagem });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar recado:', error);
      throw error;
    }
  },

  // público: só os aprovados aparecem no site
  async listarAprovados(): Promise<Comentario[]> {
    try {
      const response = await HTTPClient.get('/Comentario/ListarAprovados');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar recados aprovados:', error);
      throw error;
    }
  },

  // admin: lista todos (inclusive pendentes)
  async listar(): Promise<Comentario[]> {
    try {
      const response = await HTTPClient.get('/Comentario/ListarComentarios');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar recados:', error);
      throw error;
    }
  },

  async obterPorId(id: number): Promise<Comentario> {
    try {
      const response = await HTTPClient.get(`/Comentario/ObterComentarioPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter recado:', error);
      throw error;
    }
  },

  // admin: aprova
  async aprovar(id: number): Promise<void> {
    try {
      await HTTPClient.put(`/Comentario/AprovarComentario/${id}`);
    } catch (error) {
      console.error('Erro ao aprovar recado:', error);
      throw error;
    }
  },

  // admin: recusa/apaga
  async deletar(id: number): Promise<void> {
    try {
      await HTTPClient.delete(`/Comentario/DeletarComentario/${id}`);
    } catch (error) {
      console.error('Erro ao deletar recado:', error);
      throw error;
    }
  },
};

export default ComentarioApi;
