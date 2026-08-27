using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class UsuarioRepository : BaseRepository, IUsuarioRepository
{
  public UsuarioRepository(Zero14DbContext context) : base(context) { }

  public async Task<Usuario?> ObterPorIdAsync(int id)
  {
    return await _context.Usuarios.FirstOrDefaultAsync(usuario => usuario.ID == id);
  }

  public async Task<Usuario?> ObterPorEmailAsync(string email)
  {
    return await _context.Usuarios.FirstOrDefaultAsync(usuario => usuario.Email == email);
  }

  public async Task AtualizarAsync(Usuario usuario)
  {
    _context.Usuarios.Update(usuario);
    await _context.SaveChangesAsync();
  }
}
