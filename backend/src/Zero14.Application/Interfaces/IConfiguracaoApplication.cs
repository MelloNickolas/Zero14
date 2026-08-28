using Zero14.Domain.Entities;

namespace Zero14.Application.Interfaces;

public interface IConfiguracaoApplication
{
  Task<Configuracao> ObterConfiguracaoAsync();
  Task AtualizarConfiguracaoAsync(Configuracao configuracao);
}
