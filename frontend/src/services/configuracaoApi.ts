import { HTTPClient } from './client';
import type { Configuracao } from './types';

const ConfiguracaoApi = {
  // pública: o site usa os links / texto da bio
  async obter(): Promise<Configuracao> {
    try {
      const response = await HTTPClient.get('/Configuracao/ObterConfiguracao');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter configuração:', error);
      throw error;
    }
  },

  // admin: edita
  async atualizar(config: Omit<Configuracao, 'id'>): Promise<void> {
    try {
      await HTTPClient.put('/Configuracao/AtualizarConfiguracao', config);
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      throw error;
    }
  },
};

export default ConfiguracaoApi;
