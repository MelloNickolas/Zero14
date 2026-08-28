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

// carrega o .env (sobe as pastas até encontrar o arquivo em backend/)
Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

// ===================== BANCO =====================
var connectionString = builder.Configuration["CONNECTION_STRING"];
builder.Services.AddDbContext<Zero14DbContext>(options =>
    options.UseSqlServer(connectionString));

// ===================== REPOSITÓRIOS =====================
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEventoRepository, EventoRepository>();
builder.Services.AddScoped<IFotoRepository, FotoRepository>();
builder.Services.AddScoped<IMusicaRepository, MusicaRepository>();
builder.Services.AddScoped<IComentarioRepository, ComentarioRepository>();
builder.Services.AddScoped<IConfiguracaoRepository, ConfiguracaoRepository>();
builder.Services.AddScoped<IIntegranteRepository, IntegranteRepository>();

// ===================== APPLICATIONS =====================
builder.Services.AddScoped<IUsuarioApplication, UsuarioApplication>();
builder.Services.AddScoped<IEventoApplication, EventoApplication>();
builder.Services.AddScoped<IFotoApplication, FotoApplication>();
builder.Services.AddScoped<IMusicaApplication, MusicaApplication>();
builder.Services.AddScoped<IComentarioApplication, ComentarioApplication>();
builder.Services.AddScoped<IConfiguracaoApplication, ConfiguracaoApplication>();
builder.Services.AddScoped<IIntegranteApplication, IntegranteApplication>();
builder.Services.AddScoped<IAutenticacaoApplication, AutenticacaoApplication>();

// ===================== SERVICES (infra) =====================
builder.Services.AddScoped<IHashService, HashService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// ===================== CORS (libera o front Vite) =====================
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
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

app.Run();
