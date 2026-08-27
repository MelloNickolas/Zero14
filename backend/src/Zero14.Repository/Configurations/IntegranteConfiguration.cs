using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class IntegranteConfiguration : IEntityTypeConfiguration<Integrante>
{
  public void Configure(EntityTypeBuilder<Integrante> builder)
  {
    builder.ToTable("Integrantes");
    builder.HasKey(integrante => integrante.ID);

    builder.Property(integrante => integrante.Nome).IsRequired(true).HasMaxLength(100);
    builder.Property(integrante => integrante.Papel).IsRequired(true).HasMaxLength(100);
    builder.Property(integrante => integrante.FotoUrl).IsRequired(true).HasMaxLength(300);
    builder.Property(integrante => integrante.Descricao).IsRequired(true).HasMaxLength(400);
    builder.Property(integrante => integrante.Depoimento).IsRequired(false).HasMaxLength(400);
    builder.Property(integrante => integrante.Ordem).IsRequired(true);
  }
}
