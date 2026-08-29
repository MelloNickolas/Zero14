using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;
using Zero14.Services.Interfaces;

// mesma pasta/namespace do padrão de serviços externos
namespace Zero14.Services.UploadService;

public class UploadService : IUploadService
{
  private readonly Cloudinary _cloudinary;

  public UploadService(IConfiguration config)
  {
    var cloudName = config["CLOUDINARY_CLOUD_NAME"];
    var apiKey = config["CLOUDINARY_API_KEY"];
    var apiSecret = config["CLOUDINARY_API_SECRET"];

    var account = new Account(cloudName, apiKey, apiSecret);
    _cloudinary = new Cloudinary(account) { Api = { Secure = true } };
  }

  public async Task<string> EnviarImagemAsync(Stream arquivo, string nomeArquivo)
  {
    var uploadParams = new ImageUploadParams
    {
      File = new FileDescription(nomeArquivo, arquivo),
      Folder = "zero14",
      UniqueFilename = true,
      Overwrite = false,

      // otimização no armazenamento: limita a 1600px de largura e qualidade automática
      // (evita guardar/entregar a foto gigante -> carregamento rápido)
      Transformation = new Transformation()
        .Width(1600).Crop("limit").Quality("auto:good"),

      // pré-gera uma versão web já pronta (o 1º visitante não espera geração)
      EagerTransforms = new List<Transformation>
      {
        new Transformation().Width(1200).Crop("limit").Quality("auto").FetchFormat("auto")
      }
    };

    var resultado = await _cloudinary.UploadAsync(uploadParams);

    if (resultado.Error != null)
      throw new Exception($"Erro no upload da imagem: {resultado.Error.Message}");

    // entrega otimizada: WebP/AVIF automático + qualidade automática, via CDN
    var urlOtimizada = _cloudinary.Api.UrlImgUp
      .Secure(true)
      .Transform(new Transformation().Quality("auto").FetchFormat("auto"))
      .BuildUrl($"{resultado.PublicId}.{resultado.Format}");

    return urlOtimizada;
  }
}
