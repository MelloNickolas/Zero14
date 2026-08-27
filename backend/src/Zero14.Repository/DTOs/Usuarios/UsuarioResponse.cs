namespace Zero14.Repository.DTOs.Usuarios;

public class UsuarioResponse
{
  public int ID { get; set; }
  public string Nome { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public DateTime CriadoEm { get; set; }
  // nunca expõe a SenhaHash
}
