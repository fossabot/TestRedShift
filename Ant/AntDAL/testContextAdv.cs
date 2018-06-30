using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AntDAL.Models
{
    public class FindBetween
    {
        public FindBetween(int fromDate, int toDate)
        {
            FromDate = fromDate;
            ToDate = toDate;
        }
        public int FromDate { get; set; }
        public int ToDate { get; set; }
    }
    public class FindBetweenResult
    {
        public int FromDate { get; set; }
        public int ToDate { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
    }
    public partial class testContext : DbContext
    {
        public virtual DbSet<FindBetweenResult> FindBetweenResult { get; set; }
        public async Task<FindBetweenResult[]> Find(FindBetween f)
        {
             
            var data= await this.FindBetweenResult.FromSql($"exec findBetweenDates {f.FromDate} ,{f.ToDate}").ToArrayAsync();
            return data;


        }
    }
}
