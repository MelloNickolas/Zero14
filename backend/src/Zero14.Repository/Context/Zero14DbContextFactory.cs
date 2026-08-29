using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Zero14.Repository.Context;

// usado só em tempo de design (dotnet ef migrations / database update).
// lê a CONNECTION_STRING do .env para criar o contexto sem subir a API.
public class Zero14DbContextFactory : IDesignTimeDbContextFactory<Zero14DbContext>
{
  public Zero14DbContext CreateDbContext(string[] args)
  {
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

    try { Env.TraversePath().Load(); } catch { /* ignora */ }
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

    // fallback só pra "migrations add" (que não conecta no banco)
    if (string.IsNullOrWhiteSpace(connectionString))
      connectionString = "Host=localhost;Database=zero14;Username=postgres;Password=postgres";

    var optionsBuilder = new DbContextOptionsBuilder<Zero14DbContext>();
    optionsBuilder.UseNpgsql(ConexaoHelper.Normalizar(connectionString));

    return new Zero14DbContext(optionsBuilder.Options);
  }
}
