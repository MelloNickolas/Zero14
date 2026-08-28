using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Repository.DTOs.Usuarios;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
  private readonly IAutenticacaoApplication _autenticacaoApplication;

  public AuthController(IAutenticacaoApplication autenticacaoApplication)
  {
    _autenticacaoApplication = autenticacaoApplication;
  }

  [HttpPost("Login")]
  public async Task<ActionResult> Login([FromBody] LoginRequest request)
  {
    try
    {
      var resposta = await _autenticacaoApplication.LoginAsync(request.Email, request.Senha);
      return Ok(resposta);
    }
    catch (UnauthorizedAccessException ex)
    {
      return Unauthorized(new { mensagem = ex.Message });
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }
}
