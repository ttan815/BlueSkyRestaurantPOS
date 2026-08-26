namespace BlueSkyChineseRestaurantPOS.Models
{
    public class CustomerOrderModel
    {
        public int Id { get; set; }
        public DateTime OrderTime { get; set; }
        public decimal? DiscountPercent { get; set; } = 0;
        public decimal? DiscountConstant { get; set; } = 0;
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public List<CustomerOrderItemModel> CustomerOrderItems { get; set; } = new();
    }
}
