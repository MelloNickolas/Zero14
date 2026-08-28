using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IUsuarioApplication
{
  Task<Usuario> ObterUsuarioPorIdAsync(int usuarioID);

  // edição do próprio perfil (nome/email).
  // troca de senha e login (JWT) ficam na etapa de Autenticação.
  Task AtualizarUsuarioAsync(Usuario usuario);
}
