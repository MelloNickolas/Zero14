using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class EventoConfiguration : IEntityTypeConfiguration<Evento>
{
  public void Configure(EntityTypeBuilder<Evento> builder)
  {
    builder.ToTable("Eventos");
    builder.HasKey(evento => evento.ID);

    builder.Property(evento => evento.NomeEvento).IsRequired(true).HasMaxLength(120);
    builder.Property(evento => evento.Data).IsRequired(true);
    builder.Property(evento => evento.Cidade).IsRequired(true).HasMaxLength(100);
    builder.Property(evento => evento.Uf).IsRequired(true).HasMaxLength(2);
    builder.Property(evento => evento.Local).IsRequired(true).HasMaxLength(160);
    builder.Property(evento => evento.LinkIngresso).IsRequired(false).HasMaxLength(300);
  }
}
