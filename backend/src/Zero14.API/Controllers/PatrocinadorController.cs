using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Patrocinadores;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class PatrocinadorController : ControllerBase
{
  private readonly IPatrocinadorApplication _patrocinadorApplication;

  public PatrocinadorController(IPatrocinadorApplication patrocinadorApplication)
  {
    _patrocinadorApplication = patrocinadorApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarPatrocinadores")]
  public async Task<ActionResult> ListarPatrocinadores()
  {
    try
    {
      var patrocinadores = await _patrocinadorApplication.ListarPatrocinadoresAsync();
      return Ok(patrocinadores.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // registro de clique (público — o site chama ao clicar no patrocinador)
  [HttpPost]
  [Route("RegistrarClique/{patrocinadorId}")]
  public async Task<ActionResult> RegistrarClique([FromRoute] int patrocinadorId)
  {
    try
    {
      await _patrocinadorApplication.RegistrarCliqueAsync(patrocinadorId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarPatrocinador")]
  public async Task<ActionResult> CriarPatrocinador([FromBody] PatrocinadorRequest request)
  {
    try
    {
      var patrocinador = new Patrocinador
      {
        Nome = request.Nome,
        LogoUrl = request.LogoUrl,
        Link = request.Link,
        Ordem = request.Ordem
      };

      var id = await _patrocinadorApplication.CriarPatrocinadorAsync(patrocinador);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarPatrocinador/{patrocinadorId}")]
  public async Task<ActionResult> AtualizarPatrocinador([FromRoute] int patrocinadorId, [FromBody] PatrocinadorRequest request)
  {
    try
    {
      var patrocinador = new Patrocinador
      {
        ID = patrocinadorId,
        Nome = request.Nome,
        LogoUrl = request.LogoUrl,
        Link = request.Link,
        Ordem = request.Ordem
      };

      await _patrocinadorApplication.AtualizarPatrocinadorAsync(patrocinador);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarPatrocinador/{patrocinadorId}")]
  public async Task<ActionResult> DeletarPatrocinador([FromRoute] int patrocinadorId)
  {
    try
    {
      await _patrocinadorApplication.DeletarPatrocinadorAsync(patrocinadorId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("ReordenarPatrocinadores")]
  public async Task<ActionResult> ReordenarPatrocinadores([FromBody] List<int> idsNaOrdem)
  {
    try
    {
      await _patrocinadorApplication.ReordenarPatrocinadoresAsync(idsNaOrdem);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static PatrocinadorResponse MapearResponse(Patrocinador patrocinador) => new()
  {
    ID = patrocinador.ID,
    Nome = patrocinador.Nome,
    LogoUrl = patrocinador.LogoUrl,
    Link = patrocinador.Link,
    Cliques = patrocinador.Cliques,
    Ordem = patrocinador.Ordem
  };
}
