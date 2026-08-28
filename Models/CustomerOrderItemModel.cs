namespace BlueSkyChineseRestaurantPOS.Models
{
    public class CustomerOrderItemModel
    {
        public int Id { get; set; }
        public int CustomerOrderId { get; set; }
        public required string ItemName { get; set; } = "";
        public string ChineseItemName { get; set; } = "";
        public decimal Price { get; set; } = decimal.Zero;
        public int OrderedAmount { get; set; }
        public CustomerOrderModel CustomerOrder { get; set; } = null!;
        public List<CustomerOrderItemCustomizationModel> MenuItemCustomizations { get; set; } = new();
        public Boolean ToGo { get; set; }

    }
}
