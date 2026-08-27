using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class ComentarioConfiguration : IEntityTypeConfiguration<Comentario>
{
  public void Configure(EntityTypeBuilder<Comentario> builder)
  {
    builder.ToTable("Comentarios");
    builder.HasKey(comentario => comentario.ID);

    builder.Property(comentario => comentario.Nome).IsRequired(true).HasMaxLength(80);
    builder.Property(comentario => comentario.Mensagem).IsRequired(true).HasMaxLength(500);
    builder.Property(comentario => comentario.Aprovado).IsRequired(true);
    builder.Property(comentario => comentario.CriadoEm).IsRequired(true);
  }
}
