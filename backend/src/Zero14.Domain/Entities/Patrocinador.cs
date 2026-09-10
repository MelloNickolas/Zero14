namespace Zero14.Domain.Entities;

/*
Patrocinadores exibidos na faixa da Home (logo 1:1 + link do Instagram).
Cliques contabiliza quantas vezes clicaram no patrocinador (prova de audiência),
e Ordem define a posição na faixa (o admin reordena).
*/

public class Patrocinador
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;
  public string LogoUrl { get; set; } = string.Empty;
  public string Link { get; set; } = string.Empty;

  // contagem de cliques (só incrementa; não editável direto pelo admin)
  public int Cliques { get; set; }

  // ordem de exibição na faixa
  public int Ordem { get; set; }
}
