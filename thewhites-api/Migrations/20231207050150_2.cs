using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace asp_testing.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Ervaringsdeskundigen_GebruikerId",
                table: "Ervaringsdeskundigen");

            migrationBuilder.DropIndex(
                name: "IX_Bedrijven_GebruikerId",
                table: "Bedrijven");

            migrationBuilder.CreateIndex(
                name: "IX_Ervaringsdeskundigen_GebruikerId",
                table: "Ervaringsdeskundigen",
                column: "GebruikerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bedrijven_GebruikerId",
                table: "Bedrijven",
                column: "GebruikerId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Ervaringsdeskundigen_GebruikerId",
                table: "Ervaringsdeskundigen");

            migrationBuilder.DropIndex(
                name: "IX_Bedrijven_GebruikerId",
                table: "Bedrijven");

            migrationBuilder.CreateIndex(
                name: "IX_Ervaringsdeskundigen_GebruikerId",
                table: "Ervaringsdeskundigen",
                column: "GebruikerId");

            migrationBuilder.CreateIndex(
                name: "IX_Bedrijven_GebruikerId",
                table: "Bedrijven",
                column: "GebruikerId");
        }
    }
}
