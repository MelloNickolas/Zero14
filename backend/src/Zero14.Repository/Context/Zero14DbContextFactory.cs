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
    // sobe as pastas até achar o backend/.env
    Env.TraversePath().Load();
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

    var optionsBuilder = new DbContextOptionsBuilder<Zero14DbContext>();
    optionsBuilder.UseSqlServer(connectionString);

    return new Zero14DbContext(optionsBuilder.Options);
  }
}
