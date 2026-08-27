using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class MusicaConfiguration : IEntityTypeConfiguration<Musica>
{
  public void Configure(EntityTypeBuilder<Musica> builder)
  {
    builder.ToTable("Musicas");
    builder.HasKey(musica => musica.ID);

    builder.Property(musica => musica.Titulo).IsRequired(true).HasMaxLength(120);
    builder.Property(musica => musica.Tipo).IsRequired(true);
    builder.Property(musica => musica.UrlEmbed).IsRequired(false).HasMaxLength(300);
    builder.Property(musica => musica.Destaque).IsRequired(true);
    builder.Property(musica => musica.Ordem).IsRequired(true);
  }
}
