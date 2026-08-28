using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Usuarios;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize] // tudo aqui é do admin logado
public class UsuarioController : ControllerBase
{
  private readonly IUsuarioApplication _usuarioApplication;

  public UsuarioController(IUsuarioApplication usuarioApplication)
  {
    _usuarioApplication = usuarioApplication;
  }

  [HttpGet]
  [Route("ObterUsuarioPorId/{usuarioId}")]
  public async Task<ActionResult> ObterUsuarioPorId([FromRoute] int usuarioId)
  {
    try
    {
      var usuario = await _usuarioApplication.ObterUsuarioPorIdAsync(usuarioId);

      var resposta = new UsuarioResponse
      {
        ID = usuario.ID,
        Nome = usuario.Nome,
        Email = usuario.Email,
        CriadoEm = usuario.CriadoEm
      };

      return Ok(resposta);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // edição do próprio perfil (nome/email). Troca de senha entra na etapa de auth.
  [HttpPut]
  [Route("AtualizarUsuario/{usuarioId}")]
  public async Task<ActionResult> AtualizarUsuario([FromRoute] int usuarioId, [FromBody] UsuarioRequest request)
  {
    try
    {
      var usuario = new Usuario
      {
        ID = usuarioId,
        Nome = request.Nome,
        Email = request.Email
      };

      await _usuarioApplication.AtualizarUsuarioAsync(usuario);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }
}
