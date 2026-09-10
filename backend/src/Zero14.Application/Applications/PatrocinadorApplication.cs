using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class PatrocinadorApplication : IPatrocinadorApplication
{
  private readonly IPatrocinadorRepository _patrocinadorRepository;

  public PatrocinadorApplication(IPatrocinadorRepository patrocinadorRepository)
  {
    _patrocinadorRepository = patrocinadorRepository;
  }

  public async Task<int> CriarPatrocinadorAsync(Patrocinador patrocinador)
  {
    if (patrocinador == null)
      throw new Exception("Patrocinador não pode ser vazio.");
    ValidarInformacoesPatrocinador(patrocinador);

    return await _patrocinadorRepository.SalvarAsync(patrocinador);
  }

  public async Task AtualizarPatrocinadorAsync(Patrocinador patrocinador)
  {
    Patrocinador patrocinadorExistente = await ValidarPatrocinadorExistentePorId(patrocinador.ID);
    ValidarInformacoesPatrocinador(patrocinador);

    patrocinadorExistente.Nome = patrocinador.Nome;
    patrocinadorExistente.LogoUrl = patrocinador.LogoUrl;
    patrocinadorExistente.Link = patrocinador.Link;
    patrocinadorExistente.Ordem = patrocinador.Ordem;
    // Cliques NÃO é alterado aqui (só incrementa via RegistrarCliqueAsync)

    await _patrocinadorRepository.AtualizarAsync(patrocinadorExistente);
  }

  public async Task<Patrocinador> ObterPatrocinadorPorIdAsync(int patrocinadorID)
  {
    return await ValidarPatrocinadorExistentePorId(patrocinadorID);
  }

  public async Task<IEnumerable<Patrocinador>> ListarPatrocinadoresAsync()
  {
    return await _patrocinadorRepository.ListarAsync();
  }

  public async Task DeletarPatrocinadorAsync(int patrocinadorID)
  {
    Patrocinador patrocinadorExistente = await ValidarPatrocinadorExistentePorId(patrocinadorID);

    await _patrocinadorRepository.DeletarAsync(patrocinadorExistente);
  }

  public async Task RegistrarCliqueAsync(int patrocinadorID)
  {
    await _patrocinadorRepository.IncrementarCliqueAsync(patrocinadorID);
  }

  public async Task ReordenarPatrocinadoresAsync(List<int> idsNaOrdem)
  {
    if (idsNaOrdem == null || idsNaOrdem.Count == 0)
      throw new Exception("A lista de ordenação não pode ser vazia.");

    await _patrocinadorRepository.ReordenarAsync(idsNaOrdem);
  }

  #region Úteis
  private static void ValidarInformacoesPatrocinador(Patrocinador patrocinador)
  {
    if (string.IsNullOrWhiteSpace(patrocinador.Nome))
      throw new Exception("O nome do patrocinador não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(patrocinador.LogoUrl))
      throw new Exception("A logo do patrocinador não pode ser vazia.");
  }

  private async Task<Patrocinador> ValidarPatrocinadorExistentePorId(int patrocinadorID)
  {
    var patrocinadorExistente = await _patrocinadorRepository.ObterPorIdAsync(patrocinadorID);
    if (patrocinadorExistente == null)
      throw new Exception("Patrocinador não localizado.");

    return patrocinadorExistente;
  }
  #endregion
}
