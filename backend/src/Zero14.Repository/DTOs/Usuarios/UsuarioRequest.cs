namespace Zero14.Repository.DTOs.Usuarios;

public class UsuarioRequest
{
  public string Nome { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;

  // senha em texto puro (será convertida em hash no Service)
  public string Senha { get; set; } = string.Empty;
}
