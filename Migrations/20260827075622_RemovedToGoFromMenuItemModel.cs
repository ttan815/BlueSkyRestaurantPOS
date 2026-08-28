using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlueSkyChineseRestaurantPOS.Migrations
{
    /// <inheritdoc />
    public partial class RemovedToGoFromMenuItemModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "toGo",
                table: "MenuItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "toGo",
                table: "MenuItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
