namespace Zero14.Domain.Entities;

public class Integrante
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;

  // função / instrumento (ex: "Voz e violão", "Cavaquinho")
  public string Papel { get; set; } = string.Empty;

  // caminho da foto (a API salva o arquivo e guarda o link aqui)
  public string FotoUrl { get; set; } = string.Empty;

  // mini-bio que aparece no card
  public string Descricao { get; set; } = string.Empty;

  // frase do carrossel de depoimentos (opcional)
  public string? Depoimento { get; set; }

  // ordenação manual dos cards
  public int Ordem { get; set; }
}
