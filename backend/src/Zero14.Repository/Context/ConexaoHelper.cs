using Npgsql;

namespace Zero14.Repository.Context;

public static class ConexaoHelper
{
  // Aceita tanto o formato URI do Neon (postgresql://user:pass@host/db?...)
  // quanto o formato key-value do Npgsql (Host=...;Database=...;...).
  public static string Normalizar(string? conexao)
  {
    if (string.IsNullOrWhiteSpace(conexao)) return conexao ?? string.Empty;

    if (!conexao.StartsWith("postgres://") && !conexao.StartsWith("postgresql://"))
      return conexao; // já está no formato Npgsql

    var uri = new Uri(conexao);
    var userInfo = uri.UserInfo.Split(':', 2);

    var builder = new NpgsqlConnectionStringBuilder
    {
      Host = uri.Host,
      Port = uri.Port > 0 ? uri.Port : 5432,
      Database = uri.AbsolutePath.TrimStart('/'),
      Username = Uri.UnescapeDataString(userInfo[0]),
      Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : string.Empty,
      SslMode = SslMode.Require,
      TrustServerCertificate = true,
    };

    return builder.ConnectionString;
  }
}
