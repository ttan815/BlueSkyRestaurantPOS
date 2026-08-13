using Microsoft.AspNetCore.Mvc;

namespace BlueSkyChineseRestaurantPOS.Controllers
{
    [ApiController]
    [Route("[order]")]
    public class OrderController : ControllerBase
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
