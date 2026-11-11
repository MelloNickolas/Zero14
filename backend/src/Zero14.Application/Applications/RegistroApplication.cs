using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class RegistroApplication : IRegistroApplication
{
  private readonly IRegistroRepository _registroRepository;

  public RegistroApplication(IRegistroRepository registroRepository)
  {
    _registroRepository = registroRepository;
  }

  public async Task<int> CriarRegistroAsync(Registro registro)
  {
    if (registro == null)
      throw new Exception("Registro não pode ser vazio.");
    ValidarInformacoesRegistro(registro);

    return await _registroRepository.SalvarAsync(registro);
  }

  public async Task AtualizarRegistroAsync(Registro registro)
  {
    Registro registroExistente = await ValidarRegistroExistentePorId(registro.ID);
    ValidarInformacoesRegistro(registro);

    registroExistente.CapaUrl = registro.CapaUrl;
    registroExistente.Data = registro.Data;
    registroExistente.Local = registro.Local;
    registroExistente.Cidade = registro.Cidade;
    registroExistente.Uf = registro.Uf;
    registroExistente.LinkDrive = registro.LinkDrive;

    await _registroRepository.AtualizarAsync(registroExistente);
  }

  public async Task<Registro> ObterRegistroPorIdAsync(int registroID)
  {
    Registro registroExistente = await ValidarRegistroExistentePorId(registroID);

    return registroExistente;
  }

  public async Task<IEnumerable<Registro>> ListarRegistrosAsync()
  {
    return await _registroRepository.ListarAsync();
  }

  public async Task DeletarRegistroAsync(int registroID)
  {
    Registro registroExistente = await ValidarRegistroExistentePorId(registroID);

    await _registroRepository.DeletarAsync(registroExistente);
  }

  #region Úteis
  private static void ValidarInformacoesRegistro(Registro registro)
  {
    if (string.IsNullOrWhiteSpace(registro.CapaUrl))
      throw new Exception("A capa do registro não pode ser vazia.");
    if (string.IsNullOrWhiteSpace(registro.Local))
      throw new Exception("O local do show não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(registro.Cidade))
      throw new Exception("A cidade do show não pode ser vazia.");
    if (string.IsNullOrWhiteSpace(registro.Uf))
      throw new Exception("A UF do show não pode ser vazia.");
    if (string.IsNullOrWhiteSpace(registro.LinkDrive))
      throw new Exception("O link do drive não pode ser vazio.");
  }

  private async Task<Registro> ValidarRegistroExistentePorId(int registroID)
  {
    var registroExistente = await _registroRepository.ObterPorIdAsync(registroID);
    if (registroExistente == null)
      throw new Exception("Registro não localizado.");

    return registroExistente;
  }
  #endregion
}
