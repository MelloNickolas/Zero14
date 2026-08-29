# ===== build =====
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore Zero14.sln
RUN dotnet publish src/Zero14.API/Zero14.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# ===== runtime =====
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
# desliga o "vigia" de arquivos de config (inotify) — evita o crash no container do Render
ENV DOTNET_hostBuilder__reloadConfigOnChange=false
# o Render injeta a porta em $PORT; escutamos nela (fallback 8080 em local)
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet Zero14.API.dll"]
