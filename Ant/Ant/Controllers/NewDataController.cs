using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AntBL;
using AntDAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Ant.Controllers
{
    [Route("api/[controller]/[action]")]
    public class NewDataController : Controller
    {
        private readonly IMemoryCache memoryCache;
        private readonly testContext t;
        

        public NewDataController(IMemoryCache memoryCache, testContext t)
        {
            this.memoryCache = memoryCache;
            this.t = t;
            
        }
        public string Ping()
        {
            return "pong" + DateTime.Now;
        }
        // GET api/values
        [HttpGet("{id?}")]
        public async Task<NewCountry[]> GetCountry([FromRoute]long? id)
        {
            try
            {
                if (id == null)
                {
                    id = 42614;
                }
                return await t.FindNewCountries(id.Value);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

        }
    }
}
