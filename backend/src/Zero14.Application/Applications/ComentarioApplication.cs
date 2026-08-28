using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class ComentarioApplication : IComentarioApplication
{
  private readonly IComentarioRepository _comentarioRepository;

  public ComentarioApplication(IComentarioRepository comentarioRepository)
  {
    _comentarioRepository = comentarioRepository;
  }

  public async Task<int> CriarComentarioAsync(Comentario comentario)
  {
    if (comentario == null)
      throw new Exception("Comentário não pode ser vazio.");
    ValidarInformacoesComentario(comentario);

    // regra de moderação: o público nunca controla estes campos
    comentario.Aprovado = false;
    comentario.CriadoEm = DateTime.Now;

    return await _comentarioRepository.SalvarAsync(comentario);
  }

  public async Task AprovarComentarioAsync(int comentarioID)
  {
    Comentario comentarioExistente = await ValidarComentarioExistentePorId(comentarioID);

    comentarioExistente.Aprovado = true;

    await _comentarioRepository.AtualizarAsync(comentarioExistente);
  }

  public async Task DeletarComentarioAsync(int comentarioID)
  {
    Comentario comentarioExistente = await ValidarComentarioExistentePorId(comentarioID);

    await _comentarioRepository.DeletarAsync(comentarioExistente);
  }

  public async Task<Comentario> ObterComentarioPorIdAsync(int comentarioID)
  {
    Comentario comentarioExistente = await ValidarComentarioExistentePorId(comentarioID);

    return comentarioExistente;
  }

  public async Task<IEnumerable<Comentario>> ListarComentariosAsync()
  {
    return await _comentarioRepository.ListarAsync();
  }

  public async Task<IEnumerable<Comentario>> ListarComentariosAprovadosAsync()
  {
    return await _comentarioRepository.ListarAprovadosAsync();
  }

  #region Úteis
  private static void ValidarInformacoesComentario(Comentario comentario)
  {
    if (string.IsNullOrWhiteSpace(comentario.Nome))
      throw new Exception("O nome não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(comentario.Mensagem))
      throw new Exception("A mensagem não pode ser vazia.");
  }

  private async Task<Comentario> ValidarComentarioExistentePorId(int comentarioID)
  {
    var comentarioExistente = await _comentarioRepository.ObterPorIdAsync(comentarioID);
    if (comentarioExistente == null)
      throw new Exception("Comentário não localizado.");

    return comentarioExistente;
  }
  #endregion
}
