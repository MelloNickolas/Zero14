using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class ComentarioRepository : BaseRepository, IComentarioRepository
{
  public ComentarioRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Comentario comentario)
  {
    _context.Comentarios.Add(comentario);
    await _context.SaveChangesAsync();

    return comentario.ID;
  }

  public async Task AtualizarAsync(Comentario comentario)
  {
    _context.Comentarios.Update(comentario);
    await _context.SaveChangesAsync();
  }

  public async Task<Comentario?> ObterPorIdAsync(int id)
  {
    return await _context.Comentarios.FirstOrDefaultAsync(comentario => comentario.ID == id);
  }

  public async Task<IEnumerable<Comentario>> ListarAsync()
  {
    return await _context.Comentarios.OrderByDescending(comentario => comentario.CriadoEm).ToListAsync();
  }

  public async Task DeletarAsync(Comentario comentario)
  {
    _context.Comentarios.Remove(comentario);
    await _context.SaveChangesAsync();
  }

  public async Task<IEnumerable<Comentario>> ListarAprovadosAsync()
  {
    return await _context.Comentarios
        .Where(comentario => comentario.Aprovado)
        .OrderByDescending(comentario => comentario.CriadoEm)
        .ToListAsync();
  }
}
