<p align="center">
  <img src="README-Assets/Logo-Normal-Gradiente.png" alt="Nebula" width="200" />
</p>

<h1 align="center">Grupo Zero 14</h1>

<p align="center">
  Site full-stack com painel administrativo do grupo de pagode <strong>Zero 14</strong> — desenvolvido pela agência <strong>Nebula</strong>, do design ao deploy.
</p>

<p align="center">
  <a href="https://grupozero14.com.br"><img src="https://img.shields.io/badge/site-no%20ar-22C55E?style=flat-square" alt="no ar" /></a>
  <img src="https://img.shields.io/badge/frontend-React%20%2B%20Vite%20%2B%20TS-1E27EB?style=flat-square" alt="frontend" />
  <img src="https://img.shields.io/badge/backend-.NET%209-512BD4?style=flat-square" alt="backend" />
  <img src="https://img.shields.io/badge/banco-PostgreSQL-E12E27?style=flat-square" alt="db" />
  <img src="https://img.shields.io/badge/deploy-Vercel%20%2B%20Render-14171C?style=flat-square" alt="deploy" />
</p>

<p align="center">
  🔗 <a href="https://grupozero14.com.br"><strong>grupozero14.com.br</strong></a>
</p>

---

## 📖 Sobre

**Site institucional + painel administrativo (CMS próprio)** do Grupo Zero 14. Mais que um site, é uma aplicação onde **o próprio grupo gerencia todo o conteúdo** — agenda de shows, galeria, músicas/clipes, patrocinadores, biografia, dados de contato e moderação dos recados dos fãs — sem depender de ninguém.

O visual segue um estilo **"sketch / desenho a giz"**: traços de marcador, sombras duras tipo adesivo, textura de grão, leves rotações e a paleta oficial do grupo.

> **Status:** ✅ **No ar, completo e otimizado** (domínio próprio, SEO técnico e Google Analytics).

## 🎬 Preview

🔗 **Ao vivo:** [grupozero14.com.br](https://grupozero14.com.br)

### Home
![Home — Hero](README-Assets/Screenshots/01-home-hero.png)
![Home — Assista agora + Números](README-Assets/Screenshots/02-home-video-numeros.png)
![Home — Agenda](README-Assets/Screenshots/03-home-agenda-contato.png)
![Home — Fotos](README-Assets/Screenshots/04-fotos.png)
![Home — Contato](README-Assets/Screenshots/05-Contatos.png)
![Home — Recados](README-Assets/Screenshots/06-Recados.png)

### Responsivo (mobile)
<p align="center">
  <img src="README-Assets/Screenshots/07-mobile-home.png" alt="Home no mobile" width="260" />
  <img src="README-Assets/Screenshots/08-mobile-shows.png" alt="Shows no mobile" width="260" />
</p>

## ✨ Funcionalidades

### Site público
- **Home** — hero, faixa de **patrocinadores** (com contagem de cliques), vídeo em destaque ("Assista agora"), **números do grupo em tempo real** (via API), CTA "Ver portfólio", prévia da agenda e da galeria, contato e mural de recados
- **Shows** — agenda dos próximos shows por mês, com botão de **ingresso via WhatsApp** (mensagem pronta)
- **Biografia** — história do grupo, integrantes e depoimentos
- **Galeria** — fotos em masonry com lightbox
- **Recados** — fãs deixam mensagens (entram para moderação antes de aparecer)
- **Botão flutuante de WhatsApp**, página **404** e **Política de Privacidade** (LGPD)

### Painel administrativo (`/admin`)
- Login com **JWT** (admin único, criado por seed) + reset de credenciais via terminal
- CRUD de **shows, fotos, músicas/clipes, integrantes e patrocinadores** (com upload de imagem e reordenação)
- **Moderação de recados** (aprovar / recusar)
- Edição das **configurações** do site (contato, redes, WhatsApp, links, seguidores, biografia)

## 🛠️ Stack

**Frontend**
- Vite · React · TypeScript · Tailwind CSS (design system com tokens)
- React Router · Axios (autenticação via interceptors)
- Fontes: Kalam (display), Patrick Hand (manuscrito), Poppins (corpo)

**Backend** — arquitetura em camadas (padrão [Tarefa360](https://github.com/MelloNickolas/Tarefa360))
- .NET 9 (Web API) · Entity Framework Core · **PostgreSQL** (Neon)
- Autenticação **JWT** · **BCrypt** para hash de senha
- **Cloudinary** para upload/otimização de imagens

**Infra & DevOps**
- Backend em **Docker** no **Render** · Frontend na **Vercel**
- Domínio na Hostinger (DNS, SSL, CORS) · Migrations automáticas no startup · Keep-alive (UptimeRobot)

**SEO & Analytics**
- Meta tags dinâmicas + canonical por página · `robots.txt` · `sitemap.xml` · dados estruturados (JSON-LD)
- Imagens em **WebP** · Google Analytics 4 com consentimento de cookies (LGPD)

## 🗂️ Estrutura do repositório

```
Zero14/
├── frontend/                     # Vite + React + TS + Tailwind
│   ├── src/
│   │   ├── pages/                # site/ (público) + admin/ (painel)
│   │   ├── components/           # site/ + admin/ (Navbar, Seo, Analytics, etc.)
│   │   ├── services/             # um *Api.ts por entidade + client (axios)
│   │   └── index.css             # tokens da paleta + fontes + animações
│   └── public/                   # imagens (webp), robots.txt, sitemap.xml
│
├── backend/                      # Solution .NET 9 em camadas
│   ├── Zero14.sln
│   └── src/
│       ├── Zero14.Domain/        # entidades + enums
│       ├── Zero14.Repository/    # EF Core, Configurations, Context, Repositories, DTOs, Migrations
│       ├── Zero14.Application/    # regras de negócio (Applications + Interfaces)
│       ├── Zero14.Services/       # serviços externos (Hash/BCrypt, Token/JWT, Upload/Cloudinary)
│       └── Zero14.API/           # Controllers, JWT, seed do admin, Program.cs
│
├── prototype/                    # protótipo estático (referência de design)
├── README-Assets/                # DER, vídeo e screenshots
└── README.md
```

Fluxo de dependência: `API → Application → Repository → Domain` · `Services → Domain` (o Domínio não depende de ninguém).

## 🧩 Modelo de dados

Modelo tipo **CMS** (tabelas independentes). Documentação e diagrama em **[`README-Assets/DER.md`](README-Assets/DER.md)**.

| Tabela | Papel |
|--------|-------|
| `USUARIO` | Admin único (seed) — login |
| `EVENTO` | Agenda de shows |
| `FOTO` | Galeria (ordem manual) |
| `MUSICA` | Músicas e vídeos (destaque no hero) |
| `INTEGRANTE` | Integrantes do grupo + depoimentos |
| `PATROCINADOR` | Patrocinadores da faixa (logo, link, cliques, ordem) |
| `COMENTARIO` | Recados dos fãs (com moderação) |
| `CONFIGURACAO` | Contato, redes, links e textos (linha única) |

## 🎨 Identidade visual

| | Cor | Hex | | Tipografia | Uso |
|---|-----|-----|---|-----------|-----|
| 🔵 | Azul elétrico | `#1E27EB` | | **Kalam** | títulos / display |
| 🟡 | Amarelo | `#F5C518` | | **Patrick Hand** | detalhes manuscritos |
| 🔴 | Vermelho | `#E12E27` | | **Poppins** | corpo de texto |
| 🟢 | Verde | `#22C55E` | | | |
| ⚫ | Tinta (contorno) | `#14171C` | | | |

## 🚀 Como rodar

**Frontend**
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```
> `.env`: `VITE_API_URL` (URL da API) · `VITE_GA_ID` (opcional, Google Analytics)

**Backend**
```bash
cd backend
dotnet restore
dotnet run --project src/Zero14.API
```
> `.env`: `CONNECTION_STRING` (Neon), `CORS_ORIGINS`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_SENHA`, `CLOUDINARY_*`

**Redefinir credenciais do admin** (via terminal):
```bash
dotnet run --project src/Zero14.API -- reset-admin <novoEmail> <novaSenha>
```

## 👥 Créditos

Desenvolvido por **[Nebula](https://www.instagram.com/_nebula_designs_/)** para o **Grupo Zero 14**.
