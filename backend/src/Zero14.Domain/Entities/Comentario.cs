namespace Zero14.Domain.Entities;

/*
Essa classe serve para colocar nos murais que temos no fim do site,
além disso como uma medida protetiva criaremos uma aprovação para o admin da página validar tudo isso.
*/

public class Comentario
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;
  public string Mensagem { get; set; } = string.Empty;

  // moderação: nasce false; o admin aprova para exibir
  public bool Aprovado { get; set; }

  public DateTime CriadoEm { get; set; }
}
