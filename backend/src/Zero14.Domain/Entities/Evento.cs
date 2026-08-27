namespace Zero14.Domain.Entities;

/*
Aqui você vai poder cadastrar todos os shows, com as infos abaixos,
as propriedades foram criadas de acordo com a necessidade do cliente.
*/

public class Evento
{
  public int ID { get; set; }
  public string NomeEvento { get; set; } = string.Empty;
  public DateTime Data { get; set; }
  public string Cidade { get; set; } = string.Empty;
  public string Uf { get; set; } = string.Empty;
  public string Local { get; set; } = string.Empty;

  // opcional
  public string? LinkIngresso { get; set; }
}
