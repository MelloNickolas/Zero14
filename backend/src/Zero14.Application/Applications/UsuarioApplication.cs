using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;
using Zero14.Services.Interfaces;

namespace Zero14.Application;

public class UsuarioApplication : IUsuarioApplication
{
  private readonly IUsuarioRepository _usuarioRepository;
  private readonly IHashService _hashService;

  public UsuarioApplication(IUsuarioRepository usuarioRepository, IHashService hashService)
  {
    _usuarioRepository = usuarioRepository;
    _hashService = hashService;
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

  // RESET de emergência (uso do dev, via terminal). Não pede a senha antiga.
  public async Task RedefinirSenhaAsync(string email, string novaSenha)
  {
    var usuario = await _usuarioRepository.ObterPorEmailAsync(email);
    if (usuario == null)
      throw new Exception($"Nenhum usuário encontrado com o email '{email}'.");

    if (string.IsNullOrWhiteSpace(novaSenha) || novaSenha.Length < 6)
      throw new Exception("A nova senha deve ter pelo menos 6 caracteres.");

    usuario.SenhaHash = _hashService.GerarHash(novaSenha);
    await _usuarioRepository.AtualizarAsync(usuario);
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
