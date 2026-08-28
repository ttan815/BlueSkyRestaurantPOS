using BlueSkyChineseRestaurantPOS.Data;
using BlueSkyChineseRestaurantPOS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
namespace BlueSkyChineseRestaurantPOS.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly PosDbContext _context;
        public MenuController(PosDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<Dictionary<string, List<MenuItemModel>>>> GetMenu()
        {
            Dictionary<string, List<MenuItemModel>> menu = new Dictionary<string, List<MenuItemModel>>();

            var menuItems = await _context.MenuItems.ToListAsync();
            foreach (MenuItemModel item in menuItems)
            {
                if (!menu.ContainsKey(item.Category)){
                    menu[item.Category] = new List<MenuItemModel>();
                }
                menu[item.Category].Add(item);
            }
            return menu;
        }
    }
}
