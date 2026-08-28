using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class FotoApplication : IFotoApplication
{
  private readonly IFotoRepository _fotoRepository;

  public FotoApplication(IFotoRepository fotoRepository)
  {
    _fotoRepository = fotoRepository;
  }

  public async Task<int> CriarFotoAsync(Foto foto)
  {
    if (foto == null)
      throw new Exception("Foto não pode ser vazia.");
    ValidarInformacoesFoto(foto);

    return await _fotoRepository.SalvarAsync(foto);
  }

  public async Task AtualizarFotoAsync(Foto foto)
  {
    Foto fotoExistente = await ValidarFotoExistentePorId(foto.ID);
    ValidarInformacoesFoto(foto);

    fotoExistente.Url = foto.Url;
    fotoExistente.Legenda = foto.Legenda;
    fotoExistente.Ordem = foto.Ordem;

    await _fotoRepository.AtualizarAsync(fotoExistente);
  }

  public async Task<Foto> ObterFotoPorIdAsync(int fotoID)
  {
    Foto fotoExistente = await ValidarFotoExistentePorId(fotoID);

    return fotoExistente;
  }

  public async Task<IEnumerable<Foto>> ListarFotosAsync()
  {
    return await _fotoRepository.ListarAsync();
  }

  public async Task DeletarFotoAsync(int fotoID)
  {
    Foto fotoExistente = await ValidarFotoExistentePorId(fotoID);

    await _fotoRepository.DeletarAsync(fotoExistente);
  }

  #region Úteis
  private static void ValidarInformacoesFoto(Foto foto)
  {
    if (string.IsNullOrWhiteSpace(foto.Url))
      throw new Exception("A URL da foto não pode ser vazia.");
  }

  private async Task<Foto> ValidarFotoExistentePorId(int fotoID)
  {
    var fotoExistente = await _fotoRepository.ObterPorIdAsync(fotoID);
    if (fotoExistente == null)
      throw new Exception("Foto não localizada.");

    return fotoExistente;
  }
  #endregion
}
