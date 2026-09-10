using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;

namespace Zero14.Repository;

public class PatrocinadorRepository : BaseRepository, IPatrocinadorRepository
{
  public PatrocinadorRepository(Zero14DbContext context) : base(context) { }

  public async Task<int> SalvarAsync(Patrocinador patrocinador)
  {
    _context.Patrocinadores.Add(patrocinador);
    await _context.SaveChangesAsync();

    return patrocinador.ID;
  }

  public async Task AtualizarAsync(Patrocinador patrocinador)
  {
    _context.Patrocinadores.Update(patrocinador);
    await _context.SaveChangesAsync();
  }

  public async Task<Patrocinador?> ObterPorIdAsync(int id)
  {
    return await _context.Patrocinadores.FirstOrDefaultAsync(patrocinador => patrocinador.ID == id);
  }

  public async Task<IEnumerable<Patrocinador>> ListarAsync()
  {
    return await _context.Patrocinadores
      .OrderBy(patrocinador => patrocinador.Ordem)
      .ThenBy(patrocinador => patrocinador.ID)
      .ToListAsync();
  }

  public async Task DeletarAsync(Patrocinador patrocinador)
  {
    _context.Patrocinadores.Remove(patrocinador);
    await _context.SaveChangesAsync();
  }

  public async Task IncrementarCliqueAsync(int id)
  {
    // atualização direta no banco (não precisa carregar a entidade)
    await _context.Patrocinadores
      .Where(patrocinador => patrocinador.ID == id)
      .ExecuteUpdateAsync(set => set.SetProperty(patrocinador => patrocinador.Cliques, patrocinador => patrocinador.Cliques + 1));
  }

  public async Task ReordenarAsync(List<int> idsNaOrdem)
  {
    var patrocinadores = await _context.Patrocinadores
      .Where(patrocinador => idsNaOrdem.Contains(patrocinador.ID))
      .ToListAsync();

    foreach (var patrocinador in patrocinadores)
    {
      var novaOrdem = idsNaOrdem.IndexOf(patrocinador.ID);
      if (novaOrdem >= 0)
        patrocinador.Ordem = novaOrdem;
    }

    await _context.SaveChangesAsync();
  }
}
