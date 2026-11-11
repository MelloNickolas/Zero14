namespace Zero14.Domain.Entities;

/*
Registros dos shows ("Você no Zero 14"): cada registro é um card com a capa,
as infos do show e o link do drive onde ficam as fotos e vídeos.
*/

public class Registro
{
  public int ID { get; set; }
  public string CapaUrl { get; set; } = string.Empty;
  public DateTime Data { get; set; }
  public string Local { get; set; } = string.Empty;
  public string Cidade { get; set; } = string.Empty;
  public string Uf { get; set; } = string.Empty;
  public string LinkDrive { get; set; } = string.Empty;
}
