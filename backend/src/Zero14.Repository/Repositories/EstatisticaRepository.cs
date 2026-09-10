using Microsoft.EntityFrameworkCore;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class EstatisticaRepository : BaseRepository, IEstatisticaRepository
{
  public EstatisticaRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> ContarEventosAsync()
  {
    return await _context.Eventos.CountAsync();
  }

  public async Task<int> ContarCidadesDistintasAsync()
  {
    return await _context.Eventos
      .Select(evento => new { evento.Cidade, evento.Uf })
      .Distinct()
      .CountAsync();
  }

  public async Task<int> ContarRecadosAprovadosAsync()
  {
    return await _context.Comentarios.CountAsync(comentario => comentario.Aprovado);
  }
}
