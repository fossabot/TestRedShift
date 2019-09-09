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
        [HttpGet("{id?}")]
        public string Clear([FromRoute]long? id)
        {
            try
            {
                string name = nameof(GetCountry) + id;
                memoryCache.Remove(name);
                name = nameof(GetAuthorsNewCountry) + id;
                memoryCache.Remove(name);
                return "ok";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
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
                    id = 42613;
                    id = 0;
                }
                string name = nameof(GetCountry) + id;
                if (memoryCache.TryGetValue(name, out NewCountry[] ret))
                {
                    return ret;
                }
                ret =await t.FindNewCountries(id.Value);
                memoryCache.Set(name, ret);
                return ret;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

        }
        [HttpGet("{id}")]
        public async Task<GenericData[]> GetParent([FromRoute]long id)
        {
            try
            {
                string name = nameof(GetParent) + id;
                if (memoryCache.TryGetValue(name, out GenericData[] ret))
                {
                    return ret;
                }
                ret = await t.GetParent(id);
                memoryCache.Set(name, ret);
                return ret;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                var l = new List<GenericData>();
                l.Add( new GenericData()
                {
                    Id = 0,
                    Name = ex.Message
                });
                return l.ToArray();
            }

        }
        [HttpGet("{id}")]
        public async Task<GenericData[]> SearchCountryFromKingdoms([FromRoute]string id)
        {
            try
            {
                string name = nameof(SearchCountryFromKingdoms) + id;
                if (memoryCache.TryGetValue(name, out GenericData[] ret))
                {
                    return ret;
                }
                ret= await t.SearchCountryFromKingdoms(id);
                memoryCache.Set(name, ret);
                return ret;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        [HttpGet("{id?}")]
        public async Task<FindBetweenResult[]> GetAuthorsNewCountry([FromRoute]long? id)
        {
            try
            {
                if (id == null)
                {
                    id = 42614;
                }
                string name = nameof(GetAuthorsNewCountry) + id;
                if (memoryCache.TryGetValue(name, out FindBetweenResult[] ret))
                {
                    return ret;
                }
                ret = await t.GetAuthorsNewCountry(id.Value);
                memoryCache.Set(name, ret);
                return ret;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
