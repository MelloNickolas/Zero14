using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class PatrocinadorConfiguration : IEntityTypeConfiguration<Patrocinador>
{
  public void Configure(EntityTypeBuilder<Patrocinador> builder)
  {
    builder.ToTable("Patrocinadores");
    builder.HasKey(patrocinador => patrocinador.ID);

    builder.Property(patrocinador => patrocinador.Nome).IsRequired(true).HasMaxLength(120);
    builder.Property(patrocinador => patrocinador.LogoUrl).IsRequired(true).HasMaxLength(500);
    builder.Property(patrocinador => patrocinador.Link).IsRequired(false).HasMaxLength(300);
    builder.Property(patrocinador => patrocinador.Cliques).HasDefaultValue(0);
    builder.Property(patrocinador => patrocinador.Ordem).HasDefaultValue(0);
  }
}
