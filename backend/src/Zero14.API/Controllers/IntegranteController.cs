using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Integrantes;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class IntegranteController : ControllerBase
{
  private readonly IIntegranteApplication _integranteApplication;

  public IntegranteController(IIntegranteApplication integranteApplication)
  {
    _integranteApplication = integranteApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarIntegrantes")]
  public async Task<ActionResult> ListarIntegrantes()
  {
    try
    {
      var integrantes = await _integranteApplication.ListarIntegrantesAsync();
      return Ok(integrantes.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [HttpGet]
  [Route("ObterIntegrantePorId/{integranteId}")]
  public async Task<ActionResult> ObterIntegrantePorId([FromRoute] int integranteId)
  {
    try
    {
      var integrante = await _integranteApplication.ObterIntegrantePorIdAsync(integranteId);
      return Ok(MapearResponse(integrante));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarIntegrante")]
  public async Task<ActionResult> CriarIntegrante([FromBody] IntegranteRequest request)
  {
    try
    {
      var integrante = new Integrante
      {
        Nome = request.Nome,
        Papel = request.Papel,
        FotoUrl = request.FotoUrl,
        Descricao = request.Descricao,
        Depoimento = request.Depoimento,
        Ordem = request.Ordem
      };

      var id = await _integranteApplication.CriarIntegranteAsync(integrante);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarIntegrante/{integranteId}")]
  public async Task<ActionResult> AtualizarIntegrante([FromRoute] int integranteId, [FromBody] IntegranteRequest request)
  {
    try
    {
      var integrante = new Integrante
      {
        ID = integranteId,
        Nome = request.Nome,
        Papel = request.Papel,
        FotoUrl = request.FotoUrl,
        Descricao = request.Descricao,
        Depoimento = request.Depoimento,
        Ordem = request.Ordem
      };

      await _integranteApplication.AtualizarIntegranteAsync(integrante);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarIntegrante/{integranteId}")]
  public async Task<ActionResult> DeletarIntegrante([FromRoute] int integranteId)
  {
    try
    {
      await _integranteApplication.DeletarIntegranteAsync(integranteId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static IntegranteResponse MapearResponse(Integrante integrante) => new()
  {
    ID = integrante.ID,
    Nome = integrante.Nome,
    Papel = integrante.Papel,
    FotoUrl = integrante.FotoUrl,
    Descricao = integrante.Descricao,
    Depoimento = integrante.Depoimento,
    Ordem = integrante.Ordem
  };
}
