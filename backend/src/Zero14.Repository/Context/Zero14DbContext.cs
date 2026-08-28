using Microsoft.EntityFrameworkCore;
using Zero14.Domain.Entities;
using Zero14.Repository.Configurations;

namespace Zero14.Repository.Context;

public class Zero14DbContext : DbContext
{
  public Zero14DbContext(DbContextOptions<Zero14DbContext> options) : base(options) { }

  public DbSet<Usuario> Usuarios { get; set; } = null!;
  public DbSet<Evento> Eventos { get; set; } = null!;
  public DbSet<Foto> Fotos { get; set; } = null!;
  public DbSet<Musica> Musicas { get; set; } = null!;
  public DbSet<Comentario> Comentarios { get; set; } = null!;
  public DbSet<Configuracao> Configuracoes { get; set; } = null!;
  public DbSet<Integrante> Integrantes { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // configurações por entidade (uma por classe em Configurations/)
    modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
    modelBuilder.ApplyConfiguration(new EventoConfiguration());
    modelBuilder.ApplyConfiguration(new FotoConfiguration());
    modelBuilder.ApplyConfiguration(new MusicaConfiguration());
    modelBuilder.ApplyConfiguration(new ComentarioConfiguration());
    modelBuilder.ApplyConfiguration(new ConfiguracaoConfiguration());
    modelBuilder.ApplyConfiguration(new IntegranteConfiguration());

    // OBS: o usuário admin NÃO é semeado aqui (HasData).
    // Ele é criado no startup da API, lendo ADMIN_EMAIL / ADMIN_SENHA do .env,
    // pra manter a senha fora do Git/migrations e sem drift de hash.
  }
}
