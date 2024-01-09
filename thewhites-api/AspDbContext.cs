using AspTest.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        public DbSet<ErvaringsdeskundigeBenaderingVoorkeur> ErvaringsdeskundigeBenaderingVoorkeuren { get; set; }
        public DbSet<ErvaringsdeskundigeOnderzoekType> ErvaringsdeskundigeVoorkeurOnderzoekTypes { get; set; }
        public DbSet<OnderzoekDeelname> OnderzoekDeelnames { get; set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // TODO: maak methode voor relaties die hetzelfde zijn (many to many)
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

            modelBuilder.Entity<Onderzoek>()
                .HasOne(o => o.Bedrijf)
                .WithMany(b => b.Onderzoeken)
                .HasForeignKey(o => o.BedrijfId)
                .IsRequired();

            modelBuilder.Entity<OnderzoekBeperkingCriteria>()
                .HasKey(pc => new { pc.OnderzoekId, pc.BeperkingId });

            modelBuilder.Entity<OnderzoekBeperkingCriteria>()
                .HasOne(pc => pc.Onderzoek)
                .WithMany(o => o.BeperkingCriteria)
                .HasForeignKey(pc => pc.OnderzoekId)
                .HasPrincipalKey(o => o.Id);

             modelBuilder.Entity<OnderzoekBeperkingCriteria>()
                .HasOne(pc => pc.Beperking)
                .WithMany(b => b.OnderzoekBeperkingCriterias)
                .HasForeignKey(pc => pc.BeperkingId);

            modelBuilder.Entity<OnderzoekLeeftijdCriteria>()
                .HasKey(pc => new { pc.OnderzoekId, pc.Leeftijd });

            modelBuilder.Entity<OnderzoekLeeftijdCriteria>()
                .HasOne(pc => pc.Onderzoek)
                .WithMany(o => o.LeeftijdCriteria)
                .HasForeignKey(pc => pc.OnderzoekId)
                .HasPrincipalKey(o => o.Id);

            modelBuilder.Entity<OnderzoekPostcodeCriteria>()
                .HasKey(pc => new { pc.OnderzoekId, pc.Postcode });

            modelBuilder.Entity<OnderzoekPostcodeCriteria>()
                .HasOne(pc => pc.Onderzoek)
                .WithMany(o => o.PostcodeCriteria)
                .HasForeignKey(pc => pc.OnderzoekId);

            modelBuilder.Entity<OnderzoekCategories>()
                .HasKey(pc => new { pc.OnderzoekId, pc.TypeId });

            modelBuilder.Entity<OnderzoekCategories>()
                .HasOne(pc => pc.Onderzoek)
                .WithMany(o => o.OnderzoekCategories)
                .HasForeignKey(pc => pc.OnderzoekId);

            modelBuilder.Entity<OnderzoekCategories>()
                .HasOne(pc => pc.Type)
                .WithMany(o => o.OnderzoekCategories)
                .HasForeignKey(pc => pc.TypeId);

            modelBuilder.Entity<OnderzoekDeelname>()
                .HasKey(pc => new { pc.OnderzoekId, pc.ErvaringsdeskundigeId });

            modelBuilder.Entity<OnderzoekDeelname>()
                .HasOne(pc => pc.Onderzoek)
                .WithMany(o => o.OnderzoekDeelname)
                .HasForeignKey(pc => pc.OnderzoekId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<OnderzoekDeelname>()
                .HasOne(pc => pc.Ervaringsdeskundige)
                .WithMany(o => o.OnderzoekDeelname)
                .HasForeignKey(pc => pc.ErvaringsdeskundigeId)
                .OnDelete(DeleteBehavior.Cascade);

            // ErvaringsdeskundigeBenaderingVoorkeur (one-to-one)
            modelBuilder.Entity<ErvaringsdeskundigeBenaderingVoorkeur>()
                .HasOne(o => o.Ervaringsdeskundige)
                .WithOne(o => o.ErvaringsdeskundigeVoorkeur);
            /////////////////////////////////////////////////////

            // ErvaringsdeskundigeOnderzoekType (many-to-many)
            modelBuilder.Entity<ErvaringsdeskundigeOnderzoekType>()
                .HasKey(ot => new { ot.OnderzoekTypeId, ot.ErvaringsdeskundigeId });

            modelBuilder.Entity<ErvaringsdeskundigeOnderzoekType>()
                .HasOne(ot => ot.Ervaringsdeskundige)
                .WithMany(e => e.ErvaringsdeskundigeOnderzoekTypes)
                .HasForeignKey(f => f.ErvaringsdeskundigeId);

            modelBuilder.Entity<ErvaringsdeskundigeOnderzoekType>()
                .HasOne(ot => ot.VoorkeurOnderzoekType)
                .WithMany(e => e.ErvaringsdeskundigeOnderzoekTypes)
                .HasForeignKey(f => f.OnderzoekTypeId);
            
            // Dit moet er zijn, omdat er geen unieke Id is die elke row uniek maakt (Primary Key)
            modelBuilder.Entity<ErvaringsdeskundigeOnderzoekType>()
                .HasIndex(ot => new { ot.OnderzoekTypeId, ot.ErvaringsdeskundigeId })
                .IsUnique();
            ///////////////////////////////////////////////////
        }
    }
}