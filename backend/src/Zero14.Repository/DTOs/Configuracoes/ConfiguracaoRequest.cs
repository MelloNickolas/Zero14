namespace Zero14.Repository.DTOs.Configuracoes;

public class ConfiguracaoRequest
{
  public string Telefone { get; set; } = string.Empty;
  public string WhatsApp { get; set; } = string.Empty;
  public string EmailShows { get; set; } = string.Empty;
  public string EmailImprensa { get; set; } = string.Empty;
  public string Instagram { get; set; } = string.Empty;
  public string Youtube { get; set; } = string.Empty;
  public string Spotify { get; set; } = string.Empty;
  public string Tiktok { get; set; } = string.Empty;
  public int SeguidoresInstagram { get; set; } = 14000;
  public string Portfolio { get; set; } = string.Empty;
  public string FotoContatoUrl { get; set; } = string.Empty;
  public string BiografiaTexto { get; set; } = string.Empty;
}
