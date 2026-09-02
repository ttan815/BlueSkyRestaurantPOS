using BlueSkyChineseRestaurantPOS.Data;
using BlueSkyChineseRestaurantPOS.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueSkyChineseRestaurantPOS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly PosDbContext _context;
        public OrderController(PosDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> Order(CustomerOrderModel order)
        {
            CustomerOrderModel customerEntireOrder = new CustomerOrderModel
            {
                OrderTime = order.OrderTime,
                DiscountConstant = order.DiscountConstant,
                DiscountPercent = order.DiscountPercent,
                SubTotal = order.SubTotal,
                Tax = order.Tax,
                Total = order.Total,
                CustomerOrderItems = new List<CustomerOrderItemModel>()
            };
            foreach (CustomerOrderItemModel custOrder in order.CustomerOrderItems)
            {
                CustomerOrderItemModel customerInvidialFoodItem = new CustomerOrderItemModel
                {
                    ItemName = custOrder.ItemName,
                    ChineseItemName = custOrder.ChineseItemName,
                    Price = custOrder.Price,
                    OrderedAmount = custOrder.OrderedAmount,
                    ToGo = custOrder.ToGo,
                    MenuItemCustomizations = new List<CustomerOrderItemCustomizationModel>()
                };
                foreach(CustomerOrderItemCustomizationModel customizationObj in custOrder.MenuItemCustomizations)
                {
                    CustomerOrderItemCustomizationModel individualFoodItemCustomization = new CustomerOrderItemCustomizationModel
                    {
                        Modification = customizationObj.Modification,
                        ModificationName = customizationObj.ModificationName,
                        ModificationChineseName = customizationObj.ModificationChineseName,
                        PriceChange = customizationObj.PriceChange,
                        Description = customizationObj.Description,
                        Option = customizationObj.Option
                    };
                    customerInvidialFoodItem.MenuItemCustomizations.Add(individualFoodItemCustomization);
                }
                customerEntireOrder.CustomerOrderItems.Add(customerInvidialFoodItem);
            }
            _context.Orders.Add(customerEntireOrder);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
