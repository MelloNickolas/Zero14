using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero14.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddConfiguracaoContatoShows : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FotoContatoUrl",
                table: "Configuracoes",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Portfolio",
                table: "Configuracoes",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WhatsApp",
                table: "Configuracoes",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FotoContatoUrl",
                table: "Configuracoes");

            migrationBuilder.DropColumn(
                name: "Portfolio",
                table: "Configuracoes");

            migrationBuilder.DropColumn(
                name: "WhatsApp",
                table: "Configuracoes");
        }
    }
}
