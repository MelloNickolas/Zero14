using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero14.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddTiktok : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tiktok",
                table: "Configuracoes",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tiktok",
                table: "Configuracoes");
        }
    }
}
