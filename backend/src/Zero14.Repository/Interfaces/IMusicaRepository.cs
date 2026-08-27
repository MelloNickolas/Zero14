using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IMusicaRepository
{
  Task<int> SalvarAsync(Musica musica);
  Task AtualizarAsync(Musica musica);
  Task<Musica?> ObterPorIdAsync(int id);
  Task<IEnumerable<Musica>> ListarAsync();
  Task DeletarAsync(Musica musica);
}
