using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IEventoApplication
{
  Task<int> CriarEventoAsync(Evento evento);
  Task AtualizarEventoAsync(Evento evento);
  Task<Evento> ObterEventoPorIdAsync(int eventoID);
  Task<IEnumerable<Evento>> ListarEventosAsync();
  Task DeletarEventoAsync(int eventoID);
}
