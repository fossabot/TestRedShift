using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AntDAL.Models
{
    public partial class testContext : DbContext
    {
        public testContext()
        {
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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=test;Trusted_Connection=True;");
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
