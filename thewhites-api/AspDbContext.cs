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
        public DbSet<Onderzoek> Onderzoeken { get; set; }
        public DbSet<OnderzoekPostcodeCriteria> OnderzoekPostcodeCriteria { get; set; }
        public DbSet<OnderzoekLeeftijdCriteria> OnderzoekLeeftijdCriteria { get; set; }
        public DbSet<OnderzoekBeperkingCriteria> OnderzoekBeperkingCriteria { get; set; }
        public DbSet<OnderzoekType> OnderzoekType { get; set; }
        public DbSet<OnderzoekCategories> OnderzoekCategories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureEntity<ErvaringsdeskundigeBeperking>(modelBuilder, "BeperkingId", typeof(Beperking), "Beperking");
            ConfigureEntity<ErvaringsdeskundigeBeperking>(modelBuilder, "ErvaringsdeskundigeId", typeof(Ervaringsdeskundige), "Ervaringsdeskundige");

            ConfigureEntity<Onderzoek>(modelBuilder, "BedrijfId", typeof(Bedrijf), "Bedrijf");

            ConfigureEntity<OnderzoekLeeftijdCriteria>(modelBuilder, "OnderzoekId", typeof(Onderzoek), "Onderzoek");

            ConfigureEntity<OnderzoekPostcodeCriteria>(modelBuilder, "OnderzoekId", typeof(Onderzoek), "Onderzoek");

            ConfigureEntity<OnderzoekBeperkingCriteria>(modelBuilder, "BeperkingId", typeof(Beperking), "Beperking");
            ConfigureEntity<OnderzoekBeperkingCriteria>(modelBuilder, "OnderzoekId", typeof(Onderzoek), "Onderzoek");

            ConfigureEntity<OnderzoekCategories>(modelBuilder, "TypeId", typeof(OnderzoekType), "Type");
            ConfigureEntity<OnderzoekCategories>(modelBuilder, "OnderzoekId", typeof(Onderzoek), "Onderzoek");
        }

        private void ConfigureEntity<T>(ModelBuilder modelBuilder, string primaryKey, Type targetEntityType, string navigationProperty) where T : class
        {
            modelBuilder.Entity<T>()
                .HasKey(primaryKey);

            modelBuilder.Entity<T>()
                .HasOne(targetEntityType, navigationProperty)
                .WithMany()
                .HasForeignKey(primaryKey)
                .IsRequired();
        }
    }
}