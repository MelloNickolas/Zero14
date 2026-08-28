using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class IntegranteApplication : IIntegranteApplication
{
  private readonly IIntegranteRepository _integranteRepository;

  public IntegranteApplication(IIntegranteRepository integranteRepository)
  {
    _integranteRepository = integranteRepository;
  }

  public async Task<int> CriarIntegranteAsync(Integrante integrante)
  {
    if (integrante == null)
      throw new Exception("Integrante não pode ser vazio.");
    ValidarInformacoesIntegrante(integrante);

    return await _integranteRepository.SalvarAsync(integrante);
  }

  public async Task AtualizarIntegranteAsync(Integrante integrante)
  {
    Integrante integranteExistente = await ValidarIntegranteExistentePorId(integrante.ID);
    ValidarInformacoesIntegrante(integrante);

    integranteExistente.Nome = integrante.Nome;
    integranteExistente.Papel = integrante.Papel;
    integranteExistente.FotoUrl = integrante.FotoUrl;
    integranteExistente.Descricao = integrante.Descricao;
    integranteExistente.Depoimento = integrante.Depoimento;
    integranteExistente.Ordem = integrante.Ordem;

    await _integranteRepository.AtualizarAsync(integranteExistente);
  }

  public async Task<Integrante> ObterIntegrantePorIdAsync(int integranteID)
  {
    Integrante integranteExistente = await ValidarIntegranteExistentePorId(integranteID);

    return integranteExistente;
  }

  public async Task<IEnumerable<Integrante>> ListarIntegrantesAsync()
  {
    return await _integranteRepository.ListarAsync();
  }

  public async Task DeletarIntegranteAsync(int integranteID)
  {
    Integrante integranteExistente = await ValidarIntegranteExistentePorId(integranteID);

    await _integranteRepository.DeletarAsync(integranteExistente);
  }

  #region Úteis
  private static void ValidarInformacoesIntegrante(Integrante integrante)
  {
    if (string.IsNullOrWhiteSpace(integrante.Nome))
      throw new Exception("O nome do integrante não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(integrante.Papel))
      throw new Exception("O papel do integrante não pode ser vazio.");
  }

  private async Task<Integrante> ValidarIntegranteExistentePorId(int integranteID)
  {
    var integranteExistente = await _integranteRepository.ObterPorIdAsync(integranteID);
    if (integranteExistente == null)
      throw new Exception("Integrante não localizado.");

    return integranteExistente;
  }
  #endregion
}
