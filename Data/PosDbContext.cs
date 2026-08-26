using Microsoft.EntityFrameworkCore;
using BlueSkyChineseRestaurantPOS.Models;
namespace BlueSkyChineseRestaurantPOS.Data
{
    public class PosDbContext : DbContext
    {
        public PosDbContext(DbContextOptions<PosDbContext> options) : base(options) { }

        public DbSet<CustomerOrderModel> Orders { get; set; }
        public DbSet<CustomerOrderItemModel> OrderItems { get; set; }
        public DbSet<CustomerOrderItemCustomization> OrderItemCustomizations { get; set; }
    }
}
