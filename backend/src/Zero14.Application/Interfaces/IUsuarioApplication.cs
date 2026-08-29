using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IUsuarioApplication
{
  Task<Usuario> ObterUsuarioPorIdAsync(int usuarioID);

  // edição do próprio perfil (nome/email).
  Task AtualizarUsuarioAsync(Usuario usuario);

  // RESET de emergência (uso do dev, via terminal — NÃO exposto no front).
  // Não pede a senha antiga: troca direto. Para quando o cliente esquecer.
  Task RedefinirSenhaAsync(string email, string novaSenha);
}
