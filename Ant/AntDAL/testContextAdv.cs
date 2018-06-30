using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AntDAL.Models
{
    public class FindBetween
    {
        public string term { get; set; }
        public int countryId { get; set; }
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
            if (this.countryId > 0)
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
    public class Country:GenericData
    {
        public int NumberAuthors { get; set; }
    }
    public class GenericData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    
    public partial class testContext : DbContext
    {
        public virtual DbSet<FindBetweenResult> FindBetweenResult { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public async Task<FindBetweenResult[]> Find(FindBetween f)
        {
             
            var data= await this.FindBetweenResult.FromSql($"exec findBetweenDates {f.FromDate} ,{f.ToDate}, { f.term} , {f.countryId}" ).ToArrayAsync();
            return data;


        }

        public async Task<Country[]> FindCountries()
        {
            var data = await this.Country.FromSql($"exec GetCountries").ToArrayAsync();
            return data;

        }
    }
}
