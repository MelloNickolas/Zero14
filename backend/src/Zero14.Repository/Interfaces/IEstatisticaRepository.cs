namespace Zero14.Repository.Interfaces;

// consultas de contagem usadas na seção "Números" do site
public interface IEstatisticaRepository
{
  Task<int> ContarEventosAsync();

  // conta cidades distintas (cidade + UF) dos shows cadastrados
  Task<int> ContarCidadesDistintasAsync();

  // conta só os recados já aprovados na moderação
  Task<int> ContarRecadosAprovadosAsync();
}
