using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IFotoRepository
{
  Task<int> SalvarAsync(Foto foto);
  Task AtualizarAsync(Foto foto);
  Task<Foto?> ObterPorIdAsync(int id);
  Task<IEnumerable<Foto>> ListarAsync();
  Task DeletarAsync(Foto foto);
}
