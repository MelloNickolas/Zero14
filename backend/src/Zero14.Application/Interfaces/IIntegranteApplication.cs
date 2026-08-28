using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IIntegranteApplication
{
  Task<int> CriarIntegranteAsync(Integrante integrante);
  Task AtualizarIntegranteAsync(Integrante integrante);
  Task<Integrante> ObterIntegrantePorIdAsync(int integranteID);
  Task<IEnumerable<Integrante>> ListarIntegrantesAsync();
  Task DeletarIntegranteAsync(int integranteID);
}
