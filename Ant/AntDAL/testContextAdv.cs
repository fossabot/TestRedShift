using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AntDAL.Models
{
    public class FindBetween
    {
        public string term { get; set; }
        public FindBetween()
        {

        }
        public FindBetween(int fromDate, int toDate, string term)
        {
            FromDate = fromDate;
            ToDate = toDate;
            this.term = term;
        }
        public int? FromDate { get; set; }
        public int? ToDate { get; set; }

        public bool IsValid()
        {
            if (this.FromDate.HasValue)
                return true;
            if (this.ToDate.HasValue)
                return true;
            if (!string.IsNullOrWhiteSpace(term))
                return true;

            return false;
        }
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
             
            var data= await this.FindBetweenResult.FromSql($"exec findBetweenDates {f.FromDate} ,{f.ToDate}, { f.term}" ).ToArrayAsync();
            return data;


        }
    }
}
