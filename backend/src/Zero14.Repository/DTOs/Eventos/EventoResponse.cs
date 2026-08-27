namespace Zero14.Repository.DTOs.Eventos;

public class EventoResponse
{
  public int ID { get; set; }
  public string NomeEvento { get; set; } = string.Empty;
  public DateTime Data { get; set; }
  public string Cidade { get; set; } = string.Empty;
  public string Uf { get; set; } = string.Empty;
  public string Local { get; set; } = string.Empty;
  public string? LinkIngresso { get; set; }
}
