using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EstatisticaController : ControllerBase
{
  private readonly IEstatisticaApplication _estatisticaApplication;

  public EstatisticaController(IEstatisticaApplication estatisticaApplication)
  {
    _estatisticaApplication = estatisticaApplication;
  }

  // leitura pública (o site mostra os números)
  [HttpGet]
  [Route("ObterEstatisticas")]
  public async Task<ActionResult> ObterEstatisticas()
  {
    try
    {
      var estatisticas = await _estatisticaApplication.ObterEstatisticasAsync();
      return Ok(estatisticas);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }
}
