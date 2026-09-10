using System.Text;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Zero14.Application;
using Zero14.Application.Interfaces;
using Zero14.Domain.Entities;
using Zero14.Repository;
using Zero14.Repository.Context;
using Zero14.Repository.Interfaces;
using Zero14.Services.HashService;
using Zero14.Services.Interfaces;
using Zero14.Services.TokenService;
using Zero14.Services.UploadService;

// carrega o .env em dev (sobe as pastas até achar). Em produção (Render) as
// variáveis vêm do ambiente, então o .env pode não existir — por isso o try/catch.
try { Env.TraversePath().Load(); } catch { /* sem .env: usa variáveis do ambiente */ }

// Npgsql: trata DateTime como 'timestamp without time zone' (evita erro de fuso nas datas)
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

// ===================== BANCO =====================
var connectionString = ConexaoHelper.Normalizar(builder.Configuration["CONNECTION_STRING"]);
builder.Services.AddDbContext<Zero14DbContext>(options =>
    options.UseNpgsql(connectionString));

// ===================== REPOSITÓRIOS =====================
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEventoRepository, EventoRepository>();
builder.Services.AddScoped<IFotoRepository, FotoRepository>();
builder.Services.AddScoped<IMusicaRepository, MusicaRepository>();
builder.Services.AddScoped<IComentarioRepository, ComentarioRepository>();
builder.Services.AddScoped<IConfiguracaoRepository, ConfiguracaoRepository>();
builder.Services.AddScoped<IIntegranteRepository, IntegranteRepository>();
builder.Services.AddScoped<IEstatisticaRepository, EstatisticaRepository>();
builder.Services.AddScoped<IPatrocinadorRepository, PatrocinadorRepository>();

// ===================== APPLICATIONS =====================
builder.Services.AddScoped<IUsuarioApplication, UsuarioApplication>();
builder.Services.AddScoped<IEventoApplication, EventoApplication>();
builder.Services.AddScoped<IFotoApplication, FotoApplication>();
builder.Services.AddScoped<IMusicaApplication, MusicaApplication>();
builder.Services.AddScoped<IComentarioApplication, ComentarioApplication>();
builder.Services.AddScoped<IConfiguracaoApplication, ConfiguracaoApplication>();
builder.Services.AddScoped<IIntegranteApplication, IntegranteApplication>();
builder.Services.AddScoped<IEstatisticaApplication, EstatisticaApplication>();
builder.Services.AddScoped<IPatrocinadorApplication, PatrocinadorApplication>();
builder.Services.AddScoped<IAutenticacaoApplication, AutenticacaoApplication>();

// ===================== SERVICES (infra) =====================
builder.Services.AddScoped<IHashService, HashService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUploadService, UploadService>();

// ===================== CORS (origens vêm do .env/ambiente) =====================
// CORS_ORIGINS = lista separada por vírgula (ex: "http://localhost:5173,https://zero14.vercel.app")
var origensCors = (builder.Configuration["CORS_ORIGINS"] ?? "http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(origensCors)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ===================== JWT =====================
var jwtSecret = builder.Configuration["JWT_SECRET"] ?? "chave-dev-temporaria-troque-no-env";
var chave = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(chave),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger com suporte a JWT (pra testar os endpoints protegidos)
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Cole o token JWT aqui (sem 'Bearer ')."
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ===================== COMANDO DE RESET DE SENHA (uso do dev, via terminal) =====================
// Uso:  dotnet run --project src/Zero14.API -- reset-senha <email> <novaSenha>
// Troca a senha direto (não pede a antiga) e encerra sem subir a API.
if (args.Length >= 3 && args[0] == "reset-senha")
{
    using var scopeReset = app.Services.CreateScope();
    var usuarioApp = scopeReset.ServiceProvider.GetRequiredService<IUsuarioApplication>();
    try
    {
        await usuarioApp.RedefinirSenhaAsync(args[1], args[2]);
        Console.WriteLine($"[OK] Senha do usuário '{args[1]}' redefinida com sucesso.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[ERRO] {ex.Message}");
    }
    return;
}

// ===================== COMANDO DE TROCA DO ADMIN (uso do dev, via terminal) =====================
// Uso:  dotnet run --project src/Zero14.API -- reset-admin <novoEmail> <novaSenha>
// Troca o e-mail E a senha do admin único de uma vez. As credenciais antigas param de funcionar.
// Encerra sem subir a API.
if (args.Length >= 3 && args[0] == "reset-admin")
{
    using var scopeAdmin = app.Services.CreateScope();
    var db = scopeAdmin.ServiceProvider.GetRequiredService<Zero14DbContext>();
    var hashService = scopeAdmin.ServiceProvider.GetRequiredService<IHashService>();
    try
    {
        var novoEmail = args[1];
        var novaSenha = args[2];

        if (string.IsNullOrWhiteSpace(novoEmail) || !novoEmail.Contains('@'))
            throw new Exception("Informe um e-mail válido.");
        if (string.IsNullOrWhiteSpace(novaSenha) || novaSenha.Length < 6)
            throw new Exception("A nova senha deve ter pelo menos 6 caracteres.");

        var admin = db.Usuarios.OrderBy(usuario => usuario.ID).FirstOrDefault();
        if (admin == null)
        {
            db.Usuarios.Add(new Usuario
            {
                Nome = "Administrador",
                Email = novoEmail,
                SenhaHash = hashService.GerarHash(novaSenha),
                CriadoEm = DateTime.UtcNow
            });
            Console.WriteLine($"[OK] Admin criado com o e-mail '{novoEmail}'.");
        }
        else
        {
            admin.Email = novoEmail;
            admin.SenhaHash = hashService.GerarHash(novaSenha);
            Console.WriteLine($"[OK] Admin atualizado. Novo login: '{novoEmail}'. As credenciais antigas nao funcionam mais.");
        }
        db.SaveChanges();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[ERRO] {ex.Message}");
    }
    return;
}

// ===================== SEED DO ADMIN (lendo o .env) =====================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Zero14DbContext>();
    var hashService = scope.ServiceProvider.GetRequiredService<IHashService>();

    // aplica as migrations pendentes
    db.Database.Migrate();

    // cria o admin único se ainda não existir
    if (!db.Usuarios.Any())
    {
        var adminEmail = builder.Configuration["ADMIN_EMAIL"] ?? "admin@grupozero14.com.br";
        var adminSenha = builder.Configuration["ADMIN_SENHA"] ?? "Zero14Admin!";

        db.Usuarios.Add(new Usuario
        {
            Nome = "Administrador",
            Email = adminEmail,
            SenhaHash = hashService.GerarHash(adminSenha),
            CriadoEm = DateTime.UtcNow
        });
        db.SaveChanges();
    }

    // garante a linha única de Configuracao
    if (!db.Configuracoes.Any())
    {
        db.Configuracoes.Add(new Configuracao());
        db.SaveChanges();
    }
}

// ===================== PIPELINE =====================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// health-check (público, sem tocar no banco) — usado pelo keep-alive (UptimeRobot)
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
