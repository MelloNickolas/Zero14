using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IUsuarioRepository
{
  Task<Usuario?> ObterPorIdAsync(int id);

  // usado no login
  Task<Usuario?> ObterPorEmailAsync(string email);

  // edição do próprio perfil (email / senha)
  Task AtualizarAsync(Usuario usuario);
}
