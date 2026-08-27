using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
  public void Configure(EntityTypeBuilder<Usuario> builder)
  {
    builder.ToTable("Usuarios");
    builder.HasKey(usuario => usuario.ID);

    builder.Property(usuario => usuario.Nome).IsRequired(true).HasMaxLength(120);
    builder.Property(usuario => usuario.Email).IsRequired(true).HasMaxLength(180);
    builder.HasIndex(usuario => usuario.Email).IsUnique();
    builder.Property(usuario => usuario.SenhaHash).IsRequired(true);
    builder.Property(usuario => usuario.CriadoEm).IsRequired(true);
  }
}
