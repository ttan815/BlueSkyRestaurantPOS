namespace BlueSkyChineseRestaurantPOS.Models
{
    public class MenuItemOption
    {
        public int Id { get; set; }
        public string Modification { get; set; } // Add, More, No, Less...

        public string ModificationName { get; set; }
        public string ModificationChineseName { get; set; }
        public decimal PriceChange { get; set; }
        public string? Description { get; set; }
        public string Option {  get; set; }
    }
}
