using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IRegistroApplication
{
  Task<int> CriarRegistroAsync(Registro registro);
  Task AtualizarRegistroAsync(Registro registro);
  Task<Registro> ObterRegistroPorIdAsync(int registroID);
  Task<IEnumerable<Registro>> ListarRegistrosAsync();
  Task DeletarRegistroAsync(int registroID);
}
