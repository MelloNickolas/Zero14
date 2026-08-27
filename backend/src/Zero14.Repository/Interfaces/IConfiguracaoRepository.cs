using Zero14.Domain.Entities;

namespace Zero14.Repository.Interfaces;

public interface IConfiguracaoRepository
{
  // pega o registro único de configuração
  Task<Configuracao?> ObterAsync();

  Task AtualizarAsync(Configuracao configuracao);
}
