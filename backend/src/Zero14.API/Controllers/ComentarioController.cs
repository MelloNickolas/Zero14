using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Comentarios;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ComentarioController : ControllerBase
{
  private readonly IComentarioApplication _comentarioApplication;

  public ComentarioController(IComentarioApplication comentarioApplication)
  {
    _comentarioApplication = comentarioApplication;
  }

  // ---------- PÚBLICO ----------

  // o fã envia o recado (nasce pendente de aprovação)
  [HttpPost]
  [Route("CriarComentario")]
  public async Task<ActionResult> CriarComentario([FromBody] ComentarioRequest request)
  {
    try
    {
      var comentario = new Comentario
      {
        Nome = request.Nome,
        Mensagem = request.Mensagem
      };

      var id = await _comentarioApplication.CriarComentarioAsync(comentario);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // o site mostra só os aprovados
  [HttpGet]
  [Route("ListarAprovados")]
  public async Task<ActionResult> ListarAprovados()
  {
    try
    {
      var comentarios = await _comentarioApplication.ListarComentariosAprovadosAsync();
      return Ok(comentarios.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ADMIN (moderação) ----------

  // lista TODOS (inclusive os pendentes) pra moderar
  [Authorize]
  [HttpGet]
  [Route("ListarComentarios")]
  public async Task<ActionResult> ListarComentarios()
  {
    try
    {
      var comentarios = await _comentarioApplication.ListarComentariosAsync();
      return Ok(comentarios.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpGet]
  [Route("ObterComentarioPorId/{comentarioId}")]
  public async Task<ActionResult> ObterComentarioPorId([FromRoute] int comentarioId)
  {
    try
    {
      var comentario = await _comentarioApplication.ObterComentarioPorIdAsync(comentarioId);
      return Ok(MapearResponse(comentario));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AprovarComentario/{comentarioId}")]
  public async Task<ActionResult> AprovarComentario([FromRoute] int comentarioId)
  {
    try
    {
      await _comentarioApplication.AprovarComentarioAsync(comentarioId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarComentario/{comentarioId}")]
  public async Task<ActionResult> DeletarComentario([FromRoute] int comentarioId)
  {
    try
    {
      await _comentarioApplication.DeletarComentarioAsync(comentarioId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static ComentarioResponse MapearResponse(Comentario comentario) => new()
  {
    ID = comentario.ID,
    Nome = comentario.Nome,
    Mensagem = comentario.Mensagem,
    Aprovado = comentario.Aprovado,
    CriadoEm = comentario.CriadoEm
  };
}
