using Zero14.Services.Interfaces;

// mesma pasta/namespace do padrão de serviços externos
namespace Zero14.Services.HashService;

public class HashService : IHashService
{
  public string GerarHash(string senha)
  {
    return BCrypt.Net.BCrypt.HashPassword(senha);
  }

  public bool Verificar(string senha, string hash)
  {
    return BCrypt.Net.BCrypt.Verify(senha, hash);
  }
}
