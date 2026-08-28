namespace Zero14.Services.Interfaces;

public interface IHashService
{
  // gera o hash da senha (para salvar no banco)
  string GerarHash(string senha);

  // confere a senha digitada contra o hash salvo (no login)
  bool Verificar(string senha, string hash);
}
