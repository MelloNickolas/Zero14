using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IRegistroRepository
{
  Task<int> SalvarAsync(Registro registro);
  Task AtualizarAsync(Registro registro);
  Task<Registro?> ObterPorIdAsync(int id);
  Task<IEnumerable<Registro>> ListarAsync();
  Task DeletarAsync(Registro registro);
}
