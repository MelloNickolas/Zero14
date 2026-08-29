import { HTTPClient } from './client';

const UploadApi = {
  // sobe uma imagem pro Cloudinary (via backend) e devolve a URL otimizada
  async enviarImagem(arquivo: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);

      const response = await HTTPClient.post('/Upload/Imagem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw error;
    }
  },
};

export default UploadApi;
