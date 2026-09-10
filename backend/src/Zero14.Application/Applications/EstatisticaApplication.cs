using Zero14.Application.Interfaces;
using Zero14.Repository.DTOs.Estatisticas;
using Zero14.Repository.Interfaces;

namespace Zero14.Application;

public class EstatisticaApplication : IEstatisticaApplication
{
  // base histórica (o grupo toca desde 2023) — somada às contagens reais do banco
  private const int BaseShows = 400;
  private const int BaseCidades = 15;
  private const int SeguidoresPadrao = 14000;

  private readonly IEstatisticaRepository _estatisticaRepository;
  private readonly IConfiguracaoRepository _configuracaoRepository;

  public EstatisticaApplication(IEstatisticaRepository estatisticaRepository, IConfiguracaoRepository configuracaoRepository)
  {
    _estatisticaRepository = estatisticaRepository;
    _configuracaoRepository = configuracaoRepository;
  }

  public async Task<EstatisticasResponse> ObterEstatisticasAsync()
  {
    var totalShows = await _estatisticaRepository.ContarEventosAsync();
    var totalCidades = await _estatisticaRepository.ContarCidadesDistintasAsync();
    var totalRecados = await _estatisticaRepository.ContarRecadosAprovadosAsync();
    var configuracao = await _configuracaoRepository.ObterAsync();

    return new EstatisticasResponse
    {
      ShowsRealizados = totalShows + BaseShows,
      Cidades = totalCidades + BaseCidades,
      Recados = totalRecados,
      Seguidores = configuracao?.SeguidoresInstagram ?? SeguidoresPadrao
    };
  }
}
