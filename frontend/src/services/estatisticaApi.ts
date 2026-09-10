import { HTTPClient } from './client';
import type { Estatisticas } from './types';

const EstatisticaApi = {
  // pública: números exibidos na Home
  async obter(): Promise<Estatisticas> {
    try {
      const response = await HTTPClient.get('/Estatistica/ObterEstatisticas');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  },
};

export default EstatisticaApi;
