namespace Zero14.Repository.DTOs.Fotos;

public class FotoRequest
{
  public string Url { get; set; } = string.Empty;
  public string? Legenda { get; set; }
  public int Ordem { get; set; }
}
