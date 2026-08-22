# DER — Grupo Zero 14

Diagrama Entidade-Relacionamento do site institucional do **Grupo Zero 14** (cliente Nebula).

- **Banco:** SQL Server (EF Core, provider-agnóstico)
- **Autenticação:** 1 usuário admin único (criado por seed), JWT
- **Comentários:** com moderação (nascem `Aprovado = false`)
- **Galeria e Músicas:** ordem manual via campo `Ordem`
- **Tabelas independentes** (sem FKs) — modelo tipo CMS

## Diagrama

```mermaid
erDiagram
    USUARIO {
        int Id PK
        string Nome
        string Email UK
        string SenhaHash
        datetime CriadoEm
    }
    EVENTO {
        int Id PK
        string NomeEvento
        datetime Data
        string Cidade
        string Uf
        string Local
        string LinkIngresso "opcional"
    }
    FOTO {
        int Id PK
        string Url
        string Legenda "opcional"
        int Ordem
    }
    MUSICA {
        int Id PK
        string Titulo
        int Tipo "Musica/Video"
        string UrlEmbed "opcional"
        bool Destaque "hero"
        int Ordem
    }
    COMENTARIO {
        int Id PK
        string Nome
        string Mensagem
        bool Aprovado "moderação"
        datetime CriadoEm
    }
    CONFIGURACAO {
        int Id PK
        string Telefone
        string EmailShows
        string EmailImprensa
        string Instagram
        string Youtube
        string Spotify
    }
```

## Dicionário de dados

### USUARIO
Único registro (seed). Serve para login no painel e edição do próprio perfil (email/senha).

| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| Nome | string | |
| Email | string (UK) | único |
| SenhaHash | string | hash BCrypt |
| CriadoEm | datetime | |

### EVENTO — Agenda de shows
| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| NomeEvento | string | |
| Data | datetime | |
| Cidade | string | |
| Uf | string | |
| Local | string | |
| LinkIngresso | string | opcional |

### FOTO — Galeria
| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| Url | string | |
| Legenda | string | opcional |
| Ordem | int | ordenação manual na vitrine |

### MUSICA — Músicas e vídeos
| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| Titulo | string | |
| Tipo | int (enum) | Musica / Video |
| UrlEmbed | string | opcional (embed YouTube/Spotify) |
| Destaque | bool | destaque no hero ("Assista agora") |
| Ordem | int | ordenação manual |

### COMENTARIO — Recados dos fãs (com moderação)
| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| Nome | string | |
| Mensagem | string | |
| Aprovado | bool | default `false`; admin aprova para exibir |
| CriadoEm | datetime | |

### CONFIGURACAO — Dados de contato/rodapé (linha única)
| Campo | Tipo | Observação |
|-------|------|------------|
| Id | int (PK) | |
| Telefone | string | |
| EmailShows | string | |
| EmailImprensa | string | |
| Instagram | string | |
| Youtube | string | |
| Spotify | string | |

## Paleta de cores (PRINCIPAL)

| Cor | Hex |
|-----|-----|
| Azul elétrico | `#1E44E8` |
| Amarelo/dourado | `#F5C518` |
| Verde | `#22E06A` |
| Vermelho | `#E8241C` |
| Azul-ardósia | `#3E4A6B` |
| Verde-petróleo | `#3E7A5E` |
