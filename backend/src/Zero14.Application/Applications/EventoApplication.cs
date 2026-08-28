using Zero14.Domain.Entities;
using Zero14.Repository.Interfaces;
using Zero14.Application.Interfaces;

namespace Zero14.Application;

public class EventoApplication : IEventoApplication
{
  private readonly IEventoRepository _eventoRepository;

  public EventoApplication(IEventoRepository eventoRepository)
  {
    _eventoRepository = eventoRepository;
  }

  public async Task<int> CriarEventoAsync(Evento evento)
  {
    if (evento == null)
      throw new Exception("Evento não pode ser vazio.");
    ValidarInformacoesEvento(evento);

    return await _eventoRepository.SalvarAsync(evento);
  }

  public async Task AtualizarEventoAsync(Evento evento)
  {
    Evento eventoExistente = await ValidarEventoExistentePorId(evento.ID);
    ValidarInformacoesEvento(evento);

    eventoExistente.NomeEvento = evento.NomeEvento;
    eventoExistente.Data = evento.Data;
    eventoExistente.Cidade = evento.Cidade;
    eventoExistente.Uf = evento.Uf;
    eventoExistente.Local = evento.Local;
    eventoExistente.LinkIngresso = evento.LinkIngresso;

    await _eventoRepository.AtualizarAsync(eventoExistente);
  }

  public async Task<Evento> ObterEventoPorIdAsync(int eventoID)
  {
    Evento eventoExistente = await ValidarEventoExistentePorId(eventoID);

    return eventoExistente;
  }

  public async Task<IEnumerable<Evento>> ListarEventosAsync()
  {
    return await _eventoRepository.ListarAsync();
  }

  public async Task DeletarEventoAsync(int eventoID)
  {
    Evento eventoExistente = await ValidarEventoExistentePorId(eventoID);

    await _eventoRepository.DeletarAsync(eventoExistente);
  }

  #region Úteis
  private static void ValidarInformacoesEvento(Evento evento)
  {
    if (string.IsNullOrWhiteSpace(evento.NomeEvento))
      throw new Exception("O nome do evento não pode ser vazio.");
    if (string.IsNullOrWhiteSpace(evento.Cidade))
      throw new Exception("A cidade do evento não pode ser vazia.");
    if (string.IsNullOrWhiteSpace(evento.Uf))
      throw new Exception("A UF do evento não pode ser vazia.");
  }

  private async Task<Evento> ValidarEventoExistentePorId(int eventoID)
  {
    var eventoExistente = await _eventoRepository.ObterPorIdAsync(eventoID);
    if (eventoExistente == null)
      throw new Exception("Evento não localizado.");

    return eventoExistente;
  }
  #endregion
}
