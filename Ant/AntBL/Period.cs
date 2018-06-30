using AntDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntBL
{
    public class Period
    {
        private readonly  testContext t;

        public Period( testContext t)
        {
            this.t= t;
        }

        public Interval<int> PeriodFromDb()
        {
            var min = t.Hdperiod.Select(it => it.FromDate).Min();
            var max = t.Hdperiod.Select(it => it.ToDate).Max();
            return new Interval<int>(min, max);
        }
        public async Task<FindBetweenResult[]> Find(FindBetween f)
        {

            
            return await t.Find(f);


        }

        public async Task<GenericData[]> FindCountries()
        {
            return await t.FindCountries();
        }
    }
}
