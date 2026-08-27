namespace Zero14.Domain.Entities;

/*
Foto seria as fotos da galeria onde guardamos e colocamos uma legenda,
a propriedade de ordem serve para ordenar no front-end.
*/

public class Foto
{
  public int ID { get; set; }
  public string Url { get; set; } = string.Empty;

  // opcional
  public string? Legenda { get; set; }

  // ordenação manual na vitrine
  public int Ordem { get; set; }
}
