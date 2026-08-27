using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class MusicaRepository : BaseRepository, IMusicaRepository
{
  public MusicaRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Musica musica)
  {
    _context.Musicas.Add(musica);
    await _context.SaveChangesAsync();

    return musica.ID;
  }

  public async Task AtualizarAsync(Musica musica)
  {
    _context.Musicas.Update(musica);
    await _context.SaveChangesAsync();
  }

  public async Task<Musica?> ObterPorIdAsync(int id)
  {
    return await _context.Musicas.FirstOrDefaultAsync(musica => musica.ID == id);
  }

  public async Task<IEnumerable<Musica>> ListarAsync()
  {
    return await _context.Musicas.OrderBy(musica => musica.Ordem).ToListAsync();
  }

  public async Task DeletarAsync(Musica musica)
  {
    _context.Musicas.Remove(musica);
    await _context.SaveChangesAsync();
  }
}
