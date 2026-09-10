using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Configuracoes;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfiguracaoController : ControllerBase
{
  private readonly IConfiguracaoApplication _configuracaoApplication;

  public ConfiguracaoController(IConfiguracaoApplication configuracaoApplication)
  {
    _configuracaoApplication = configuracaoApplication;
  }

  // leitura pública (o site usa os links / texto da bio)
  [HttpGet]
  [Route("ObterConfiguracao")]
  public async Task<ActionResult> ObterConfiguracao()
  {
    try
    {
      var config = await _configuracaoApplication.ObterConfiguracaoAsync();

      var resposta = new ConfiguracaoResponse
      {
        ID = config.ID,
        Telefone = config.Telefone,
        WhatsApp = config.WhatsApp,
        EmailShows = config.EmailShows,
        EmailImprensa = config.EmailImprensa,
        Instagram = config.Instagram,
        Youtube = config.Youtube,
        Spotify = config.Spotify,
        Tiktok = config.Tiktok,
        SeguidoresInstagram = config.SeguidoresInstagram,
        Portfolio = config.Portfolio,
        FotoContatoUrl = config.FotoContatoUrl,
        BiografiaTexto = config.BiografiaTexto
      };

      return Ok(resposta);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // edição só pelo admin logado
  [Authorize]
  [HttpPut]
  [Route("AtualizarConfiguracao")]
  public async Task<ActionResult> AtualizarConfiguracao([FromBody] ConfiguracaoRequest request)
  {
    try
    {
      var config = new Configuracao
      {
        Telefone = request.Telefone,
        WhatsApp = request.WhatsApp,
        EmailShows = request.EmailShows,
        EmailImprensa = request.EmailImprensa,
        Instagram = request.Instagram,
        Youtube = request.Youtube,
        Spotify = request.Spotify,
        Tiktok = request.Tiktok,
        SeguidoresInstagram = request.SeguidoresInstagram,
        Portfolio = request.Portfolio,
        FotoContatoUrl = request.FotoContatoUrl,
        BiografiaTexto = request.BiografiaTexto
      };

      await _configuracaoApplication.AtualizarConfiguracaoAsync(config);
      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }
}
