using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class FotoConfiguration : IEntityTypeConfiguration<Foto>
{
  public void Configure(EntityTypeBuilder<Foto> builder)
  {
    builder.ToTable("Fotos");
    builder.HasKey(foto => foto.ID);

    builder.Property(foto => foto.Url).IsRequired(true).HasMaxLength(300);
    builder.Property(foto => foto.Legenda).IsRequired(false).HasMaxLength(160);
    builder.Property(foto => foto.Ordem).IsRequired(true);
  }
}
