using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Zero14.Domain.Entities;
using Zero14.Services.Interfaces;

// mesma pasta/namespace do padrão de serviços externos
namespace Zero14.Services.TokenService;

public class TokenService : ITokenService
{
  // IConfiguration injeta os valores (vêm do .env carregado no startup)
  private readonly IConfiguration _config;

  public TokenService(IConfiguration config)
  {
    _config = config;
  }

  public string GerarToken(Usuario usuario)
  {
    var secret = _config["JWT_SECRET"]
      ?? throw new Exception("JWT_SECRET não configurado no .env.");
    var issuer = _config["JWT_ISSUER"];
    var audience = _config["JWT_AUDIENCE"];
    var minutos = int.Parse(_config["JWT_EXPIRACAO_MINUTOS"] ?? "120");

    // chave secreta -> credenciais de assinatura (HMAC SHA256)
    var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
    var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

    // "claims" = informações que viajam dentro do token
    var claims = new[]
    {
      new Claim(JwtRegisteredClaimNames.Sub, usuario.ID.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
      new Claim("nome", usuario.Nome)
    };

    var token = new JwtSecurityToken(
      issuer: issuer,
      audience: audience,
      claims: claims,
      expires: DateTime.UtcNow.AddMinutes(minutos),
      signingCredentials: credenciais
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }
}
