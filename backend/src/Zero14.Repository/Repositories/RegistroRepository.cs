using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class RegistroRepository : BaseRepository, IRegistroRepository
{
  public RegistroRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Registro registro)
  {
    _context.Registros.Add(registro);
    await _context.SaveChangesAsync();

    return registro.ID;
  }

  public async Task AtualizarAsync(Registro registro)
  {
    _context.Registros.Update(registro);
    await _context.SaveChangesAsync();
  }

  public async Task<Registro?> ObterPorIdAsync(int id)
  {
    return await _context.Registros.FirstOrDefaultAsync(registro => registro.ID == id);
  }

  public async Task<IEnumerable<Registro>> ListarAsync()
  {
    return await _context.Registros.OrderByDescending(registro => registro.Data).ToListAsync();
  }

  public async Task DeletarAsync(Registro registro)
  {
    _context.Registros.Remove(registro);
    await _context.SaveChangesAsync();
  }
}
