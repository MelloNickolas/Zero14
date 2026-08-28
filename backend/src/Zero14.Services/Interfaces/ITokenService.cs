using Zero14.Domain.Entities;

namespace Zero14.Services.Interfaces;

public interface ITokenService
{
  // gera o JWT do usuário logado (usado no login do painel)
  string GerarToken(Usuario usuario);
}
