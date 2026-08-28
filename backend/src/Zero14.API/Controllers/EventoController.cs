using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Eventos;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EventoController : ControllerBase
{
  private readonly IEventoApplication _eventoApplication;

  public EventoController(IEventoApplication eventoApplication)
  {
    _eventoApplication = eventoApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarEventos")]
  public async Task<ActionResult> ListarEventos()
  {
    try
    {
      var eventos = await _eventoApplication.ListarEventosAsync();
      return Ok(eventos.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [HttpGet]
  [Route("ObterEventoPorId/{eventoId}")]
  public async Task<ActionResult> ObterEventoPorId([FromRoute] int eventoId)
  {
    try
    {
      var evento = await _eventoApplication.ObterEventoPorIdAsync(eventoId);
      return Ok(MapearResponse(evento));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarEvento")]
  public async Task<ActionResult> CriarEvento([FromBody] EventoRequest request)
  {
    try
    {
      var evento = new Evento
      {
        NomeEvento = request.NomeEvento,
        Data = request.Data,
        Cidade = request.Cidade,
        Uf = request.Uf,
        Local = request.Local,
        LinkIngresso = request.LinkIngresso
      };

      var id = await _eventoApplication.CriarEventoAsync(evento);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarEvento/{eventoId}")]
  public async Task<ActionResult> AtualizarEvento([FromRoute] int eventoId, [FromBody] EventoRequest request)
  {
    try
    {
      var evento = new Evento
      {
        ID = eventoId,
        NomeEvento = request.NomeEvento,
        Data = request.Data,
        Cidade = request.Cidade,
        Uf = request.Uf,
        Local = request.Local,
        LinkIngresso = request.LinkIngresso
      };

      await _eventoApplication.AtualizarEventoAsync(evento);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarEvento/{eventoId}")]
  public async Task<ActionResult> DeletarEvento([FromRoute] int eventoId)
  {
    try
    {
      await _eventoApplication.DeletarEventoAsync(eventoId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static EventoResponse MapearResponse(Evento evento) => new()
  {
    ID = evento.ID,
    NomeEvento = evento.NomeEvento,
    Data = evento.Data,
    Cidade = evento.Cidade,
    Uf = evento.Uf,
    Local = evento.Local,
    LinkIngresso = evento.LinkIngresso
  };
}
