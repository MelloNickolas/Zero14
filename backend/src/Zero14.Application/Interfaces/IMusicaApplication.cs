using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IMusicaApplication
{
  Task<int> CriarMusicaAsync(Musica musica);
  Task AtualizarMusicaAsync(Musica musica);
  Task<Musica> ObterMusicaPorIdAsync(int musicaID);
  Task<IEnumerable<Musica>> ListarMusicasAsync();
  Task DeletarMusicaAsync(int musicaID);
}
