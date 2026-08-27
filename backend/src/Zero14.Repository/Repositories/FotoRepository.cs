using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class FotoRepository : BaseRepository, IFotoRepository
{
  public FotoRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Foto foto)
  {
    _context.Fotos.Add(foto);
    await _context.SaveChangesAsync();

    return foto.ID;
  }

  public async Task AtualizarAsync(Foto foto)
  {
    _context.Fotos.Update(foto);
    await _context.SaveChangesAsync();
  }

  public async Task<Foto?> ObterPorIdAsync(int id)
  {
    return await _context.Fotos.FirstOrDefaultAsync(foto => foto.ID == id);
  }

  public async Task<IEnumerable<Foto>> ListarAsync()
  {
    return await _context.Fotos.OrderBy(foto => foto.Ordem).ToListAsync();
  }

  public async Task DeletarAsync(Foto foto)
  {
    _context.Fotos.Remove(foto);
    await _context.SaveChangesAsync();
  }
}
