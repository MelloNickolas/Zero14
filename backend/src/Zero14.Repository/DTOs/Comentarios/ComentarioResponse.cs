namespace Zero14.Repository.DTOs.Comentarios;

public class ComentarioResponse
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;
  public string Mensagem { get; set; } = string.Empty;
  public bool Aprovado { get; set; }
  public DateTime CriadoEm { get; set; }
}
