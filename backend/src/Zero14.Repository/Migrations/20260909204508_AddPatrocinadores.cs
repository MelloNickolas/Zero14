using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Zero14.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddPatrocinadores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patrocinadores",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    LogoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Link = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Cliques = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Ordem = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patrocinadores", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Patrocinadores");
        }
    }
}
