using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IFotoApplication
{
  Task<int> CriarFotoAsync(Foto foto);
  Task AtualizarFotoAsync(Foto foto);
  Task<Foto> ObterFotoPorIdAsync(int fotoID);
  Task<IEnumerable<Foto>> ListarFotosAsync();
  Task DeletarFotoAsync(int fotoID);
}
