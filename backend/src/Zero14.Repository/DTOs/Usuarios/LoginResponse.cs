namespace Zero14.Repository.DTOs.Usuarios;

public class LoginResponse
{
  public string Token { get; set; } = string.Empty;
  public string Nome { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
}
