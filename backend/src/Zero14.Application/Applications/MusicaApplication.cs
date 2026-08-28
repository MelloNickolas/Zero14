using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class MusicaApplication : IMusicaApplication
{
  private readonly IMusicaRepository _musicaRepository;

  public MusicaApplication(IMusicaRepository musicaRepository)
  {
    _musicaRepository = musicaRepository;
  }

  public async Task<int> CriarMusicaAsync(Musica musica)
  {
    if (musica == null)
      throw new Exception("Música não pode ser vazia.");
    ValidarInformacoesMusica(musica);

    return await _musicaRepository.SalvarAsync(musica);
  }

  public async Task AtualizarMusicaAsync(Musica musica)
  {
    Musica musicaExistente = await ValidarMusicaExistentePorId(musica.ID);
    ValidarInformacoesMusica(musica);

    musicaExistente.Titulo = musica.Titulo;
    musicaExistente.Tipo = musica.Tipo;
    musicaExistente.UrlEmbed = musica.UrlEmbed;
    musicaExistente.Destaque = musica.Destaque;
    musicaExistente.Ordem = musica.Ordem;

    await _musicaRepository.AtualizarAsync(musicaExistente);
  }

  public async Task<Musica> ObterMusicaPorIdAsync(int musicaID)
  {
    Musica musicaExistente = await ValidarMusicaExistentePorId(musicaID);

    return musicaExistente;
  }

  public async Task<IEnumerable<Musica>> ListarMusicasAsync()
  {
    return await _musicaRepository.ListarAsync();
  }

  public async Task DeletarMusicaAsync(int musicaID)
  {
    Musica musicaExistente = await ValidarMusicaExistentePorId(musicaID);

    await _musicaRepository.DeletarAsync(musicaExistente);
  }

  #region Úteis
  private static void ValidarInformacoesMusica(Musica musica)
  {
    if (string.IsNullOrWhiteSpace(musica.Titulo))
      throw new Exception("O título da música não pode ser vazio.");
  }

  private async Task<Musica> ValidarMusicaExistentePorId(int musicaID)
  {
    var musicaExistente = await _musicaRepository.ObterPorIdAsync(musicaID);
    if (musicaExistente == null)
      throw new Exception("Música não localizada.");

    return musicaExistente;
  }
  #endregion
}
