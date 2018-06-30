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
    public class PeriodController : Controller
    {
        private readonly IMemoryCache memoryCache;
        private readonly testContext t;
        private readonly Period p;

        public PeriodController(IMemoryCache memoryCache, testContext t, Period p)
        {
            this.memoryCache = memoryCache;
            this.t = t;
            this.p = p;
        }
        public string Ping()
        {
            return "pong" + DateTime.Now;
        }
        // GET api/values
        [HttpGet]
        public Hdperiod[] GetAll()
        {
            return t.Hdperiod.ToArray();
        }
        
        public Interval<int> Periods()
        {
            string name = nameof(Periods);
            if(memoryCache.TryGetValue(name,out Interval<int> ret))
            {
                return ret;
            }
            ret =p.PeriodFromDb();
            memoryCache.Set(name, ret);
            return ret;
        }
        [HttpGet("{min}/{max}")]
        public async Task<FindBetweenResult[]> Find(int max, int min)
        {
            string name = max + nameof(Find) + min ;
            if (memoryCache.TryGetValue(name, out FindBetweenResult[] ret))
            {
                return ret;
            }
            ret = await p.Find(new FindBetween(min, max));
            memoryCache.Set(name, ret);
            return ret;
        }
    }
}
