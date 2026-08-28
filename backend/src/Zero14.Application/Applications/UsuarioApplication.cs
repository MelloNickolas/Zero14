using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class UsuarioApplication : IUsuarioApplication
{
  private readonly IUsuarioRepository _usuarioRepository;

  public UsuarioApplication(IUsuarioRepository usuarioRepository)
  {
    _usuarioRepository = usuarioRepository;
  }

  public async Task<Usuario> ObterUsuarioPorIdAsync(int usuarioID)
  {
    Usuario usuarioExistente = await ValidarUsuarioExistentePorId(usuarioID);

    return usuarioExistente;
  }

  public async Task AtualizarUsuarioAsync(Usuario usuario)
  {
    Usuario usuarioExistente = await ValidarUsuarioExistentePorId(usuario.ID);
    ValidarInformacoesUsuario(usuario);

    usuarioExistente.Nome = usuario.Nome;
    usuarioExistente.Email = usuario.Email;

    await _usuarioRepository.AtualizarAsync(usuarioExistente);
  }

  #region Úteis
  private static void ValidarInformacoesUsuario(Usuario usuario)
  {
    if (string.IsNullOrWhiteSpace(usuario.Nome))
      throw new Exception("O nome não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(usuario.Email))
      throw new Exception("O email não pode ser vazio.");
  }

  private async Task<Usuario> ValidarUsuarioExistentePorId(int usuarioID)
  {
    var usuarioExistente = await _usuarioRepository.ObterPorIdAsync(usuarioID);
    if (usuarioExistente == null)
      throw new Exception("Usuário não localizado.");

    return usuarioExistente;
  }
  #endregion
}
