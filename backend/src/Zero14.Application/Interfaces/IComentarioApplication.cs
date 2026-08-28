using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IComentarioApplication
{
  // público envia (nasce pendente de aprovação)
  Task<int> CriarComentarioAsync(Comentario comentario);

  // admin: modera
  Task AprovarComentarioAsync(int comentarioID);
  Task DeletarComentarioAsync(int comentarioID);

  Task<Comentario> ObterComentarioPorIdAsync(int comentarioID);
  Task<IEnumerable<Comentario>> ListarComentariosAsync();        // admin (todos)
  Task<IEnumerable<Comentario>> ListarComentariosAprovadosAsync(); // site público
}
