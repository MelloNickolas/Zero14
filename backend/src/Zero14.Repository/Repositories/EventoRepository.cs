using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class EventoRepository : BaseRepository, IEventoRepository
{
  public EventoRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Evento evento)
  {
    _context.Eventos.Add(evento);
    await _context.SaveChangesAsync();

    return evento.ID;
  }

  public async Task AtualizarAsync(Evento evento)
  {
    _context.Eventos.Update(evento);
    await _context.SaveChangesAsync();
  }

  public async Task<Evento?> ObterPorIdAsync(int id)
  {
    return await _context.Eventos.FirstOrDefaultAsync(evento => evento.ID == id);
  }

  public async Task<IEnumerable<Evento>> ListarAsync()
  {
    return await _context.Eventos.OrderBy(evento => evento.Data).ToListAsync();
  }

  public async Task DeletarAsync(Evento evento)
  {
    _context.Eventos.Remove(evento);
    await _context.SaveChangesAsync();
  }
}
