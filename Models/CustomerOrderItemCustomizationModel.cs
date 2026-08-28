namespace BlueSkyChineseRestaurantPOS.Models
{
    public class CustomerOrderItemCustomizationModel
    {
        public int Id { get; set; }
        public int CustomerOrderItemId { get; set; }
        public string Modification { get; set; } = "";
        public string ModificationName { get; set; } = "";
        public string ModificationChineseName { get; set; } = "";
        public decimal PriceChange { get; set; }
        public string? Description { get; set; }
        public string? Option { get; set; }
        public CustomerOrderItemModel CustomerOrderItem{ get; set; } = null!;
    }
}
