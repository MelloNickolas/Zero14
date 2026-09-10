namespace Zero14.Repository.DTOs.Patrocinadores;

public class PatrocinadorRequest
{
  public string Nome { get; set; } = string.Empty;
  public string LogoUrl { get; set; } = string.Empty;
  public string Link { get; set; } = string.Empty;
  public int Ordem { get; set; }
}
