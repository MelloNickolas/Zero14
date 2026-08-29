namespace Zero14.Services.Interfaces;

public interface IUploadService
{
  // sobe a imagem no Cloudinary e devolve a URL otimizada (CDN)
  Task<string> EnviarImagemAsync(Stream arquivo, string nomeArquivo);
}
