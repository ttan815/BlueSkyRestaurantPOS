using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlueSkyChineseRestaurantPOS.Migrations
{
    /// <inheritdoc />
    public partial class RemovedAmountMenuItemModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderedAmount",
                table: "MenuItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderedAmount",
                table: "MenuItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
