using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class ConfiguracaoRepository : BaseRepository, IConfiguracaoRepository
{
  public ConfiguracaoRepository(Zero14DbContext context) : base(context) { }

  public async Task<Configuracao?> ObterAsync()
  {
    return await _context.Configuracoes.FirstOrDefaultAsync();
  }

  public async Task AtualizarAsync(Configuracao configuracao)
  {
    _context.Configuracoes.Update(configuracao);
    await _context.SaveChangesAsync();
  }
}
