import { HTTPClient } from './client';

const UsuarioApi = {
  async obterPorId(id: number) {
    try {
      const response = await HTTPClient.get(`/Usuario/ObterUsuarioPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      throw error;
    }
  },

  async atualizar(id: number, nome: string, email: string) {
    try {
      const response = await HTTPClient.put(`/Usuario/AtualizarUsuario/${id}`, { nome, email });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },
  // Obs.: troca de senha é reset de emergência via terminal do backend
  // (dotnet run -- reset-senha), não fica exposto no painel.
};

export default UsuarioApi;
