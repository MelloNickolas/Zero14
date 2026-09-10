using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero14.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddSeguidoresInstagram : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SeguidoresInstagram",
                table: "Configuracoes",
                type: "integer",
                nullable: false,
                defaultValue: 14000);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeguidoresInstagram",
                table: "Configuracoes");
        }
    }
}
