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
        public async Task<FindBetweenResult[]> FindAdvanced(string idTopic, string idSpec,string idLitMov)
        {


            return await t.FindAdvanced(idTopic,idSpec,idLitMov);


        }
        public async Task<Topic[]> FindTopics()
        {
            return await t.FindTopics();
        }
        public async Task<Specialization[]> FindSpecializations()
        {
            return await t.FindSpecializations();
        }
        public async Task<Country[]> FindCountries()
        {
            return await t.FindCountries();
        }
        public async Task<Movement[]> FindMovement()
        {
            return await t.FindMovements();
        }
    }
}
