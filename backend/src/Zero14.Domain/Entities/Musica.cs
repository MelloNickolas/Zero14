using Zero14.Domain.Enums;

namespace Zero14.Domain.Entities;

public class Musica
{
  public int ID { get; set; }
  public string Titulo { get; set; } = string.Empty;
  public TipoMusica Tipo { get; set; }

  // opcional (embed do YouTube/Spotify)
  public string? UrlEmbed { get; set; }

  // destaque no hero ("Assista agora")
  public bool Destaque { get; set; }

  // ordenação manual
  public int Ordem { get; set; }
}
