using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class IntegranteRepository : BaseRepository, IIntegranteRepository
{
  public IntegranteRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Integrante integrante)
  {
    _context.Integrantes.Add(integrante);
    await _context.SaveChangesAsync();

    return integrante.ID;
  }

  public async Task AtualizarAsync(Integrante integrante)
  {
    _context.Integrantes.Update(integrante);
    await _context.SaveChangesAsync();
  }

  public async Task<Integrante?> ObterPorIdAsync(int id)
  {
    return await _context.Integrantes.FirstOrDefaultAsync(integrante => integrante.ID == id);
  }

  public async Task<IEnumerable<Integrante>> ListarAsync()
  {
    return await _context.Integrantes.OrderBy(integrante => integrante.Ordem).ToListAsync();
  }

  public async Task DeletarAsync(Integrante integrante)
  {
    _context.Integrantes.Remove(integrante);
    await _context.SaveChangesAsync();
  }
}
