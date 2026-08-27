namespace Zero14.Repository.DTOs.Integrantes;

public class IntegranteRequest
{
  public string Nome { get; set; } = string.Empty;
  public string Papel { get; set; } = string.Empty;
  public string FotoUrl { get; set; } = string.Empty;
  public string Descricao { get; set; } = string.Empty;
  public string? Depoimento { get; set; }
  public int Ordem { get; set; }
}
