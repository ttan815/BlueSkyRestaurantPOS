namespace BlueSkyChineseRestaurantPOS.Models
{
    public class MenuItemModel
    {
        public int Id { get; set; }
        public required string ItemName { get; set; }
        public string? ChineseItemName { get; set; }
        public decimal Price { get; set; }
        public required string Category { get; set; } = "";
        
    }
}
