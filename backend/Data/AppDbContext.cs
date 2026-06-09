using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {

        }

        public DbSet<Job> Jobs => Set<Job>();
        public DbSet<Customer> Customers { get; set; }
        
        public DbSet<JobPhoto> JobPhotos { get; set; }
        
        
    }
}

