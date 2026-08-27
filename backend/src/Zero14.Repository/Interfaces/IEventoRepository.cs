using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IEventoRepository
{
  Task<int> SalvarAsync(Evento evento);
  Task AtualizarAsync(Evento evento);
  Task<Evento?> ObterPorIdAsync(int id);
  Task<IEnumerable<Evento>> ListarAsync();
  Task DeletarAsync(Evento evento);
}
