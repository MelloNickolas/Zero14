using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zero14.Domain.Entities;

namespace Zero14.Repository.Configurations;

public class ConfiguracaoConfiguration : IEntityTypeConfiguration<Configuracao>
{
  public void Configure(EntityTypeBuilder<Configuracao> builder)
  {
    builder.ToTable("Configuracoes");
    builder.HasKey(configuracao => configuracao.ID);

    builder.Property(configuracao => configuracao.Telefone).HasMaxLength(30);
    builder.Property(configuracao => configuracao.EmailShows).HasMaxLength(180);
    builder.Property(configuracao => configuracao.EmailImprensa).HasMaxLength(180);
    builder.Property(configuracao => configuracao.Instagram).HasMaxLength(300);
    builder.Property(configuracao => configuracao.Youtube).HasMaxLength(300);
    builder.Property(configuracao => configuracao.Spotify).HasMaxLength(300);
    builder.Property(configuracao => configuracao.BiografiaTexto).HasMaxLength(4000);
  }
}
