using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IPatrocinadorRepository
{
  Task<int> SalvarAsync(Patrocinador patrocinador);
  Task AtualizarAsync(Patrocinador patrocinador);
  Task<Patrocinador?> ObterPorIdAsync(int id);
  Task<IEnumerable<Patrocinador>> ListarAsync();
  Task DeletarAsync(Patrocinador patrocinador);

  // soma +1 no contador de cliques do patrocinador
  Task IncrementarCliqueAsync(int id);

  // reatribui a Ordem de acordo com a posição na lista de IDs recebida
  Task ReordenarAsync(List<int> idsNaOrdem);
}
