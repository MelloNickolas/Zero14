using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IComentarioRepository
{
  Task<int> SalvarAsync(Comentario comentario);
  Task AtualizarAsync(Comentario comentario);
  Task<Comentario?> ObterPorIdAsync(int id);
  Task<IEnumerable<Comentario>> ListarAsync();
  Task DeletarAsync(Comentario comentario);

  // moderação: só os aprovados aparecem no site público
  Task<IEnumerable<Comentario>> ListarAprovadosAsync();
}
