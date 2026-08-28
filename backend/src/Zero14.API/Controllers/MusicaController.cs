using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository.DTOs.Musicas;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
public class MusicaController : ControllerBase
{
  private readonly IMusicaApplication _musicaApplication;

  public MusicaController(IMusicaApplication musicaApplication)
  {
    _musicaApplication = musicaApplication;
  }

  // ---------- LEITURA (pública) ----------

  [HttpGet]
  [Route("ListarMusicas")]
  public async Task<ActionResult> ListarMusicas()
  {
    try
    {
      var musicas = await _musicaApplication.ListarMusicasAsync();
      var resposta = musicas.Select(MapearResponse);

      return Ok(resposta);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [HttpGet]
  [Route("ObterMusicaPorId/{musicaId}")]
  public async Task<ActionResult> ObterMusicaPorId([FromRoute] int musicaId)
  {
    try
    {
      var musica = await _musicaApplication.ObterMusicaPorIdAsync(musicaId);

      return Ok(MapearResponse(musica));
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- ESCRITA (só admin logado) ----------

  [Authorize]
  [HttpPost]
  [Route("CriarMusica")]
  public async Task<ActionResult> CriarMusica([FromBody] MusicaRequest request)
  {
    try
    {
      var musica = new Musica
      {
        Titulo = request.Titulo,
        Tipo = request.Tipo,
        UrlEmbed = request.UrlEmbed,
        Destaque = request.Destaque,
        Ordem = request.Ordem
      };

      var id = await _musicaApplication.CriarMusicaAsync(musica);

      return Ok(id);
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpPut]
  [Route("AtualizarMusica/{musicaId}")]
  public async Task<ActionResult> AtualizarMusica([FromRoute] int musicaId, [FromBody] MusicaRequest request)
  {
    try
    {
      var musica = new Musica
      {
        ID = musicaId,
        Titulo = request.Titulo,
        Tipo = request.Tipo,
        UrlEmbed = request.UrlEmbed,
        Destaque = request.Destaque,
        Ordem = request.Ordem
      };

      await _musicaApplication.AtualizarMusicaAsync(musica);

      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  [Authorize]
  [HttpDelete]
  [Route("DeletarMusica/{musicaId}")]
  public async Task<ActionResult> DeletarMusica([FromRoute] int musicaId)
  {
    try
    {
      await _musicaApplication.DeletarMusicaAsync(musicaId);

      return Ok();
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }

  // ---------- mapeamento entidade -> DTO ----------
  private static MusicaResponse MapearResponse(Musica musica) => new()
  {
    ID = musica.ID,
    Titulo = musica.Titulo,
    Tipo = musica.Tipo,
    UrlEmbed = musica.UrlEmbed,
    Destaque = musica.Destaque,
    Ordem = musica.Ordem
  };
}
