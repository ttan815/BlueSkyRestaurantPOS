using BlueSkyChineseRestaurantPOS.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlueSkyChineseRestaurantPOS.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        public IActionResult ProcessOrder([FromBody] OrderModel order)
        {
            Console.WriteLine(order);
            return Ok(order);
        }
    }
}
