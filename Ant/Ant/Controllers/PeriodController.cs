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
        public async ValueTask<Country[]> Countries()
        {
            Console.WriteLine("start countries + " + Environment.GetEnvironmentVariable("cloudUser") + " --");
            string name = nameof(Countries) ;
            if (memoryCache.TryGetValue(name, out Country[] ret))
            {
                return ret;
            }
            ret = await p.FindCountries();
            memoryCache.Set(name, ret);
            return ret;
        }
        public async ValueTask<Movement[]> Movements()
        {
            string name = nameof(Movements);
            if (memoryCache.TryGetValue(name, out Movement[] ret))
            {
                return ret;
            }
            ret = await p.FindMovement();
            memoryCache.Set(name, ret);
            return ret;
        }
        [HttpGet]
        public async Task<Topic[]> FindTopics()
        {
            return await t.FindTopics();
        }
        [HttpGet]
        public async Task<Specialization[]> FindSpecializations()
        {
            return await t.FindSpecializations();
        }
        [HttpGet("{idTopic}/{idSpecialization}")]
        public async Task<FindBetweenResult[]> FindAdvanced(string idTopic, string idSpecialization)
        {
            return await t.FindAdvanced(idTopic,idSpecialization);
        }
        [HttpPost]
        public async Task<FindBetweenResult[]> Find([FromBody]FindBetween f)
        {
            if (f?.IsValid() != true)
                return new[]{new  FindBetweenResult()
                {
                        Name  = " NO SEARCH"
                }
                };

            //string name = f.FromDate + nameof(Find) + f.ToDate + "_"+f.term;
    
            //if (memoryCache.TryGetValue(name, out FindBetweenResult[] ret))
            //{
            //    return ret;
            //}
            var ret = await p.Find(f);
            //memoryCache.Set(name, ret);
            return ret;
        }
    }
}
