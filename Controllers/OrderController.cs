using BlueSkyChineseRestaurantPOS.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueSkyChineseRestaurantPOS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Order(OrderModel order)
        {
            foreach(MenuItemModel customerOrder in order.OrderList)
            {
                Console.WriteLine(customerOrder.ItemName);
            }
            return Ok();
        }
    }
}
