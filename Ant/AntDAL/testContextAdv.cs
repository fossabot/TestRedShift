using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace AntDAL.Models
{
    public class FindBetween
    {
        public string term { get; set; }
        public int countryId { get; set; }
        public int movementId { get; set; }
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
            if (this.movementId > 0)
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
        public int FromDate { get; set; }
        public int ToDate { get; set; }
    }

    public class Movement : GenericData
    {
        public int NumberMovements{ get; set; }
        public int FromDate { get; set; }
        public int ToDate { get; set; }
    }
    public class GenericData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class Topic
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long HdNumber { get; set; }
    }
    public class Specialization
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long HdNumber { get; set; }
        public long? IDParent { get; set; }
    }

    public partial class testContext : DbContext
    {
        public virtual DbSet<Specialization> FindSpecialization { get; set; }

        public virtual DbSet<Topic> FindTopic { get; set; }
        public virtual DbSet<FindBetweenResult> FindBetweenResult { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Movement> Movement { get; set; }
        
        public async Task<FindBetweenResult[]> Find(FindBetween f)
        {
             
            var data= await this.FindBetweenResult.FromSql($"exec findBetweenDates {f.FromDate} ,{f.ToDate}, { f.term} , {f.countryId}, {f.movementId}" ).ToArrayAsync();
            return data;


        }
        public async Task<Specialization[]> FindSpecializations()
        {
            var data = await this.FindSpecialization.FromSql($"select ID, Name, Count as HdNumber, IDParent from [HDSpecialization] order by IDParent ").ToArrayAsync();
            return data;
        }
        public async Task<FindBetweenResult[]> FindAdvanced(long idTopic, long idSpecialization)
        {
            var data = await this.FindBetweenResult.FromSql($"exec Search {idTopic} , {idSpecialization}").ToArrayAsync();
            return data;
        }
        public async Task<Topic[]> FindTopics()
        {
            var data = await this.FindTopic.FromSql($"select ID, Name, Count as HdNumber from HDTopic order by Name  ").ToArrayAsync();
            return data;
        }
        public static string ConnectionSqlServer()
        {
            var cn = "";
            var sql = new SqlConnectionStringBuilder();

            string user = Environment.GetEnvironmentVariable("cloudUser");
            Console.WriteLine("start in ConnectioSqlServer " + Environment.GetEnvironmentVariable("cloudUser") + " --");
            if (!string.IsNullOrWhiteSpace(user))
            {

                var pwd = Environment.GetEnvironmentVariable("cloudPwd");
                var server = Environment.GetEnvironmentVariable("cloudConnection");
                return $"Server = {server}; Initial Catalog = InfoRO; Persist Security Info = False; User ID = {user}; Password ={pwd}; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30; ";
                
            }
            else
            {
                cn = "Server=.;Database=InfoRo20181224;Trusted_Connection=True;";
            }
            Console.WriteLine("connection is" + cn);
            return cn;
        }

        public async ValueTask<Country[]> FindCountries()
        {
            var data = await this.Country.FromSql($"exec GetCountries").ToArrayAsync();
            return data;

        }
        public async ValueTask<Movement[]> FindMovements()
        {
            var data = await this.Movement.FromSql($"exec GetMovements").ToArrayAsync();
            return data;

        }
        
    }
}
