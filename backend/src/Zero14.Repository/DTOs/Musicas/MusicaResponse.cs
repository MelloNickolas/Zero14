using Zero14.Domain.Enums;

namespace Zero14.Repository.DTOs.Musicas;

public class MusicaResponse
{
  public int ID { get; set; }
  public string Titulo { get; set; } = string.Empty;
  public TipoMusica Tipo { get; set; }
  public string? UrlEmbed { get; set; }
  public bool Destaque { get; set; }
  public int Ordem { get; set; }
}
