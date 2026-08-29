using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zero14.Services.Interfaces;

namespace Zero14.API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize] // só admin logado sobe imagem
public class UploadController : ControllerBase
{
  private readonly IUploadService _uploadService;

  public UploadController(IUploadService uploadService)
  {
    _uploadService = uploadService;
  }

  [HttpPost("Imagem")]
  public async Task<ActionResult> Imagem(IFormFile arquivo)
  {
    try
    {
      if (arquivo == null || arquivo.Length == 0)
        return BadRequest(new { mensagem = "Nenhum arquivo enviado." });

      var permitidos = new[] { "image/jpeg", "image/png", "image/webp" };
      if (!permitidos.Contains(arquivo.ContentType))
        return BadRequest(new { mensagem = "Formato inválido. Use JPG, PNG ou WebP." });

      using var stream = arquivo.OpenReadStream();
      var url = await _uploadService.EnviarImagemAsync(stream, arquivo.FileName);

      return Ok(new { url });
    }
    catch (Exception ex)
    {
      return BadRequest(new { mensagem = ex.Message });
    }
  }
}
