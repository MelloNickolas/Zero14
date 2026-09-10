using Zero14.Repository.DTOs.Estatisticas;

namespace Zero14.Application.Interfaces;

public interface IEstatisticaApplication
{
  Task<EstatisticasResponse> ObterEstatisticasAsync();
}
