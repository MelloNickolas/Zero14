using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IIntegranteRepository
{
  Task<int> SalvarAsync(Integrante integrante);
  Task AtualizarAsync(Integrante integrante);
  Task<Integrante?> ObterPorIdAsync(int id);
  Task<IEnumerable<Integrante>> ListarAsync();
  Task DeletarAsync(Integrante integrante);
}
