using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
using Data.Entities.CarRequest;

namespace Data.Contexts
{
    public class UNDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public UNDbContext(DbContextOptions<UNDbContext> options) : base(options)
        {

        }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<AccountTree> AccountTrees { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<CarRequest> CarRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }
        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }
        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;
                }
            ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
            }
        }

    }

}
