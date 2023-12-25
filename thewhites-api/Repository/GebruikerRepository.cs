using AspTest.Models;

namespace AspTest.Repository
{
    public class GebruikerRepository : IGebruikerRepository
    {
        private readonly AspDbContext _context;

        public GebruikerRepository(AspDbContext context)
        {
            _context = context;
        }


        public async Task<Gebruiker> CreateGebruiker(string voornaam, string achternaam, string googleid, string emailadres, string rol = "ervaringsdeskundige")
        {
            Gebruiker gbr = new Gebruiker();
            gbr.Voornaam = voornaam;
            gbr.Achternaam = achternaam;
            gbr.Emailadres = emailadres;
            gbr.GoogleId = googleid;
            gbr.Rol = rol;
            
            _context.Gebruikers.Add(gbr);

            await _context.SaveChangesAsync();

            return gbr;
        }

        public Gebruiker? GetGebruikerById(int gebruikerId)
        {
            return _context.Gebruikers.ToList().Find(p => p.Id == gebruikerId);
        }

        public Gebruiker? GetGebruikerByGoogleId(string googleId)
        {
            return _context.Gebruikers.ToList().Find(p => p.GoogleId == googleId);
        }

        public ICollection<Gebruiker> GetGebruikers()
        {
            return _context.Gebruikers.ToList();
        }
    }
}