using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Fotos;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class FotoController : ControllerBase
{
  private readonly IFotoApplication _fotoApplication;

  public FotoController(IFotoApplication fotoApplication)
  {
    _fotoApplication = fotoApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarFotos")]
  public async Task<ActionResult> ListarFotos()
  {
    try
    {
      var fotos = await _fotoApplication.ListarFotosAsync();
      return Ok(fotos.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [HttpGet]
  [Route("ObterFotoPorId/{fotoId}")]
  public async Task<ActionResult> ObterFotoPorId([FromRoute] int fotoId)
  {
    try
    {
      var foto = await _fotoApplication.ObterFotoPorIdAsync(fotoId);
      return Ok(MapearResponse(foto));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarFoto")]
  public async Task<ActionResult> CriarFoto([FromBody] FotoRequest request)
  {
    try
    {
      var foto = new Foto
      {
        Url = request.Url,
        Legenda = request.Legenda,
        Ordem = request.Ordem
      };

      var id = await _fotoApplication.CriarFotoAsync(foto);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarFoto/{fotoId}")]
  public async Task<ActionResult> AtualizarFoto([FromRoute] int fotoId, [FromBody] FotoRequest request)
  {
    try
    {
      var foto = new Foto
      {
        ID = fotoId,
        Url = request.Url,
        Legenda = request.Legenda,
        Ordem = request.Ordem
      };

      await _fotoApplication.AtualizarFotoAsync(foto);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarFoto/{fotoId}")]
  public async Task<ActionResult> DeletarFoto([FromRoute] int fotoId)
  {
    try
    {
      await _fotoApplication.DeletarFotoAsync(fotoId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static FotoResponse MapearResponse(Foto foto) => new()
  {
    ID = foto.ID,
    Url = foto.Url,
    Legenda = foto.Legenda,
    Ordem = foto.Ordem
  };
}
