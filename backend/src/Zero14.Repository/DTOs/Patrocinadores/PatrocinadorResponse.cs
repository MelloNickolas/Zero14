namespace Zero14.Repository.DTOs.Patrocinadores;

public class PatrocinadorResponse
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;
  public string LogoUrl { get; set; } = string.Empty;
  public string Link { get; set; } = string.Empty;
  public int Cliques { get; set; }
  public int Ordem { get; set; }
}
