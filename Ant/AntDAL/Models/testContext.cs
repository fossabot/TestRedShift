using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AntDAL.Models
{
    public partial class testContext : DbContext
    {
        public testContext()
        {
            this.Database.SetCommandTimeout(120);
        }

        public testContext(DbContextOptions<testContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Hdperiod> Hdperiod { get; set; }

        // Unable to generate entity type for table 'dbo.HierarchicalDictionaryOld'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.HierarchicalDictionaryLinksOld'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.HierarchicalDictionary'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.HierarchicalDictionaryLinks'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.IterateFinal'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
    
                optionsBuilder.UseSqlServer(ConnectionSqlServer());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hdperiod>(entity =>
            {
                entity.HasKey(e => e.Idhd);

                entity.ToTable("HDPeriod");

                entity.HasIndex(e => new { e.FromDate, e.ToDate })
                    .HasName("IX_Dates");

                entity.Property(e => e.Idhd)
                    .HasColumnName("IDHD")
                    .ValueGeneratedNever();
            });
        }
    }
}
