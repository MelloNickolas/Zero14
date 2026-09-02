namespace Zero14.Domain.Entities;

/*
Essa classe serve para guardarmos os links, configurar de acordo com as mudanças,
gerar todos os links que o admin precisa para administrar sozinho a página.
*/

public class Configuracao
{
  public int ID { get; set; }
  public string Telefone { get; set; } = string.Empty;

  // número do WhatsApp (só dígitos, ex.: 5511912345678) usado nos botões de contato dos shows
  public string WhatsApp { get; set; } = string.Empty;
  public string EmailShows { get; set; } = string.Empty;
  public string EmailImprensa { get; set; } = string.Empty;
  public string Instagram { get; set; } = string.Empty;
  public string Youtube { get; set; } = string.Empty;
  public string Spotify { get; set; } = string.Empty;

  // link do portfólio (exibido na navbar no lugar do Instagram)
  public string Portfolio { get; set; } = string.Empty;

  // foto exibida na seção de contato (upload pelo admin via Cloudinary)
  public string FotoContatoUrl { get; set; } = string.Empty;

  // texto da biografia (editável pelo admin no lugar do lorem ipsum)
  public string BiografiaTexto { get; set; } = string.Empty;
}
