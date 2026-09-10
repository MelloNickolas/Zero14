using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IPatrocinadorApplication
{
  Task<int> CriarPatrocinadorAsync(Patrocinador patrocinador);
  Task AtualizarPatrocinadorAsync(Patrocinador patrocinador);
  Task<Patrocinador> ObterPatrocinadorPorIdAsync(int patrocinadorID);
  Task<IEnumerable<Patrocinador>> ListarPatrocinadoresAsync();
  Task DeletarPatrocinadorAsync(int patrocinadorID);

  // registra +1 clique (chamado pelo site quando alguém clica no patrocinador)
  Task RegistrarCliqueAsync(int patrocinadorID);

  // reordena a faixa (recebe os IDs na nova ordem)
  Task ReordenarPatrocinadoresAsync(List<int> idsNaOrdem);
}
