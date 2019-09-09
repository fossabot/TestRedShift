using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
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
    public class NewCountry 
    {
        public int NumberAuthors { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public long IdParent { get; set; }

        public string SearchCriteria { get; set; }

        public void MinimizeSearchCriteria()
        {
            var str = SearchCriteria.Split('!').ToHashSet();
            SearchCriteria = string.Join(",", str);

        }
    }

    public class Movement : GenericData
    {
        public int NumberMovements{ get; set; }
        public int FromDate { get; set; }
        public int ToDate { get; set; }
    }
    public class Parent: GenericData
    {
        public int orig { get; set; }
        public int IDhd { get; set; }
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
        public virtual DbSet<NewCountry> NewCountry { get; set; }
        public virtual DbSet<Movement> Movement { get; set; }
        public virtual DbSet<Parent> Parent { get; set; }
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
        public async Task<Specialization[]> FindLiteraryMovements()
        {
            var data = await this.FindSpecialization.FromSql($"select ID, Name, Count as HdNumber, IDParent from [HDLiteraryMovements] order by IDParent ").ToArrayAsync();
            return data;
        }
        public async Task<Specialization[]> FindProf()
        {
            var data = await this.FindSpecialization.FromSql($"select ID, Name, Count as HdNumber, IDParent from [HDProfession] order by IDParent ").ToArrayAsync();
            return data;
        }
        
        public async Task<FindBetweenResult[]> FindAdvanced(string idTopic, string idSpecialization, string idLitMov,string idProf)
        {
            var data = await this.FindBetweenResult.FromSql($"exec Search {idTopic} , {idSpecialization} , {idLitMov}, {idProf}").ToArrayAsync();
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
                cn = "Server=.;Database=inforo20190723;Trusted_Connection=True;";
            }
            Console.WriteLine("connection is" + cn);
            return cn;
        }
        public async ValueTask<FindBetweenResult[]> GetAuthorsNewCountry(long id)
        {
            var data = await this.FindBetweenResult.FromSql(
                $@"
select 
hd.IDHD as id, hd.Name , 1 as FromDate , 2 as ToDate
from CountryAuthors  ca  with (nolock)
inner join HierarchicalDictionary hd with (nolock) on ca.IDHDAuthor= hd.IDHD
where ca.IDHDCountry = {id}").ToArrayAsync();
            
            return data;

        }
        public async ValueTask<NewCountry[]> FindNewCountries(long id)
        {
            var data = await this.NewCountry.FromSql(
                $@"
select c.idHDCountry as id,
replace(STRING_AGG(cast(c.searchCriteria as varchar(max)),'!') ,'!!','') as SearchCriteria, c.CountryName as Name, count(distinct ca.ID)as NumberAuthors,c.idHDCountry  as IdParent 
from CountryFromKingdoms  c
left join CountryAuthors ca on  c.idHDCountry=ca.IDHDCountry 
where c.idparent = {id}
group by c.idHDCountry, c.CountryName").ToArrayAsync();
            foreach(var item in data)
            {
                item.IdParent = id;
                item.MinimizeSearchCriteria();

            }
            return data;
                 
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

        public async ValueTask<Parent[]> GetParent(long id)
        {
            var data = await this.Parent.FromSql($"exec parentHD {id}").ToArrayAsync();
            return data;
        }
        public async ValueTask<GenericData[]> SearchCountryFromKingdoms(string name)
        {
            var data = await this.Parent.FromSql(
                $@"select idHDCountry, CountryName as Name 
                0 as orig, 0 as IDhd
                from CountryFromKingdoms
                where CountryName like '%{name}%'").ToArrayAsync();
            return data;
        }

    }
}
