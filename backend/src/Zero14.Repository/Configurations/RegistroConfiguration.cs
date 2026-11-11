using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class RegistroConfiguration : IEntityTypeConfiguration<Registro>
{
  public void Configure(EntityTypeBuilder<Registro> builder)
  {
    builder.ToTable("Registros");
    builder.HasKey(registro => registro.ID);

    builder.Property(registro => registro.CapaUrl).IsRequired(true).HasMaxLength(500);
    builder.Property(registro => registro.Data).IsRequired(true);
    builder.Property(registro => registro.Local).IsRequired(true).HasMaxLength(160);
    builder.Property(registro => registro.Cidade).IsRequired(true).HasMaxLength(100);
    builder.Property(registro => registro.Uf).IsRequired(true).HasMaxLength(2);
    builder.Property(registro => registro.LinkDrive).IsRequired(true).HasMaxLength(500);
  }
}
