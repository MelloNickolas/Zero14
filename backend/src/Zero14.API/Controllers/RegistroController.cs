using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Registros;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class RegistroController : ControllerBase
{
  private readonly IRegistroApplication _registroApplication;

  public RegistroController(IRegistroApplication registroApplication)
  {
    _registroApplication = registroApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarRegistros")]
  public async Task<ActionResult> ListarRegistros()
  {
    try
    {
      var registros = await _registroApplication.ListarRegistrosAsync();
      return Ok(registros.Select(MapearResponse));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [HttpGet]
  [Route("ObterRegistroPorId/{registroId}")]
  public async Task<ActionResult> ObterRegistroPorId([FromRoute] int registroId)
  {
    try
    {
      var registro = await _registroApplication.ObterRegistroPorIdAsync(registroId);
      return Ok(MapearResponse(registro));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarRegistro")]
  public async Task<ActionResult> CriarRegistro([FromBody] RegistroRequest request)
  {
    try
    {
      var registro = new Registro
      {
        CapaUrl = request.CapaUrl,
        Data = request.Data,
        Local = request.Local,
        Cidade = request.Cidade,
        Uf = request.Uf,
        LinkDrive = request.LinkDrive
      };

      var id = await _registroApplication.CriarRegistroAsync(registro);
      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarRegistro/{registroId}")]
  public async Task<ActionResult> AtualizarRegistro([FromRoute] int registroId, [FromBody] RegistroRequest request)
  {
    try
    {
      var registro = new Registro
      {
        ID = registroId,
        CapaUrl = request.CapaUrl,
        Data = request.Data,
        Local = request.Local,
        Cidade = request.Cidade,
        Uf = request.Uf,
        LinkDrive = request.LinkDrive
      };

      await _registroApplication.AtualizarRegistroAsync(registro);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarRegistro/{registroId}")]
  public async Task<ActionResult> DeletarRegistro([FromRoute] int registroId)
  {
    try
    {
      await _registroApplication.DeletarRegistroAsync(registroId);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  private static RegistroResponse MapearResponse(Registro registro) => new()
  {
    ID = registro.ID,
    CapaUrl = registro.CapaUrl,
    Data = registro.Data,
    Local = registro.Local,
    Cidade = registro.Cidade,
    Uf = registro.Uf,
    LinkDrive = registro.LinkDrive
  };
}
