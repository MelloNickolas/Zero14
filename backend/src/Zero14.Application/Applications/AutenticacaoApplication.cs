using Zero14.Application.Interfaces;
using Zero14.Repository.DTOs.Usuarios;
using Zero14.Repository.Interfaces;
using Zero14.Services.Interfaces;

namespace Zero14.Application;

public class AutenticacaoApplication : IAutenticacaoApplication
{
  private readonly IUsuarioRepository _usuarioRepository;
  private readonly IHashService _hashService;
  private readonly ITokenService _tokenService;

  public AutenticacaoApplication(
    IUsuarioRepository usuarioRepository,
    IHashService hashService,
    ITokenService tokenService)
  {
    _usuarioRepository = usuarioRepository;
    _hashService = hashService;
    _tokenService = tokenService;
  }

  public async Task<LoginResponse> LoginAsync(string email, string senha)
  {
    var usuario = await _usuarioRepository.ObterPorEmailAsync(email);

    // mensagem genérica: não revela se foi o email ou a senha que errou
    if (usuario == null || !_hashService.Verificar(senha, usuario.SenhaHash))
      throw new UnauthorizedAccessException("Usuário ou senha inválidos.");

    var token = _tokenService.GerarToken(usuario);

    return new LoginResponse
    {
      Token = token,
      Nome = usuario.Nome,
      Email = usuario.Email
    };
  }
}
