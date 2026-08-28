using Zero14.Repository.DTOs.Usuarios;

namespace Zero14.Application.Interfaces;

public interface IAutenticacaoApplication
{
  // login simples: email + senha -> devolve o JWT
  Task<LoginResponse> LoginAsync(string email, string senha);
}
