using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class ConfiguracaoApplication : IConfiguracaoApplication
{
  private readonly IConfiguracaoRepository _configuracaoRepository;

  public ConfiguracaoApplication(IConfiguracaoRepository configuracaoRepository)
  {
    _configuracaoRepository = configuracaoRepository;
  }

  public async Task<Configuracao> ObterConfiguracaoAsync()
  {
    var configuracao = await _configuracaoRepository.ObterAsync();
    if (configuracao == null)
      throw new Exception("Configuração não encontrada.");

    return configuracao;
  }

  public async Task AtualizarConfiguracaoAsync(Configuracao configuracao)
  {
    if (configuracao == null)
      throw new Exception("Configuração não pode ser vazia.");

    Configuracao configuracaoExistente = await ObterConfiguracaoAsync();

    configuracaoExistente.Telefone = configuracao.Telefone;
    configuracaoExistente.WhatsApp = configuracao.WhatsApp;
    configuracaoExistente.EmailShows = configuracao.EmailShows;
    configuracaoExistente.EmailImprensa = configuracao.EmailImprensa;
    configuracaoExistente.Instagram = configuracao.Instagram;
    configuracaoExistente.Youtube = configuracao.Youtube;
    configuracaoExistente.Spotify = configuracao.Spotify;
    configuracaoExistente.Tiktok = configuracao.Tiktok;
    configuracaoExistente.SeguidoresInstagram = configuracao.SeguidoresInstagram;
    configuracaoExistente.Portfolio = configuracao.Portfolio;
    configuracaoExistente.FotoContatoUrl = configuracao.FotoContatoUrl;
    configuracaoExistente.BiografiaTexto = configuracao.BiografiaTexto;

    await _configuracaoRepository.AtualizarAsync(configuracaoExistente);
  }
}
