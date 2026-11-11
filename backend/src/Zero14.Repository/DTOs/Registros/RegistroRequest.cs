namespace Zero14.Repository.DTOs.Registros;

public class RegistroRequest
{
  public string CapaUrl { get; set; } = string.Empty;
  public DateTime Data { get; set; }
  public string Local { get; set; } = string.Empty;
  public string Cidade { get; set; } = string.Empty;
  public string Uf { get; set; } = string.Empty;
  public string LinkDrive { get; set; } = string.Empty;
}
