namespace BlueSkyChineseRestaurantPOS.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public DateTime OrderTime { get; set; }
        public List<MenuItemModel> OrderList { get; set; } = new List<MenuItemModel>();
        public decimal Discount { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }

    }
}
