using AspTest.Models;
using Microsoft.EntityFrameworkCore;

namespace AspTest
{
    public class AspDbContext : DbContext
    {
        public AspDbContext(DbContextOptions<AspDbContext> options) : base(options)
        {

        }

        public DbSet<Gebruiker> Gebruikers { get; set; }
        public DbSet<Bedrijf> Bedrijven { get; set; }
        public DbSet<Ervaringsdeskundige> Ervaringsdeskundigen { get; set; }
        public DbSet<Beperking> Beperkingen { get; set; }
        public DbSet<ErvaringsdeskundigeBeperking> ErvaringsdeskundigeBeperkingen { get; set; }
        public DbSet<Notificatie> Notificaties { get; set; }
        public DbSet<RefreshToken> RefreshTokens {get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ErvaringsdeskundigeBeperking>()
                .HasKey(pc => new { pc.BeperkingId, pc.ErvaringsdeskundigeId });

            modelBuilder.Entity<ErvaringsdeskundigeBeperking>()
                .HasOne(p => p.Beperking)
                .WithMany(pc => pc.ErvaringsdeskundigeBeperkingen)
                .HasForeignKey(p => p.BeperkingId);

            modelBuilder.Entity<ErvaringsdeskundigeBeperking>()
                .HasOne(p => p.Ervaringsdeskundige)
                .WithMany(pc => pc.ErvaringsdeskundigeBeperkingen)
                .HasForeignKey(p => p.ErvaringsdeskundigeId);

        }
    }
}