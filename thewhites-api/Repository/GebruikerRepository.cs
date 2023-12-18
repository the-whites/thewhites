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

        public Gebruiker? GetGebruiker(int gebruikerId)
        {
            return _context.Gebruikers.ToList().Find(p => p.Id == gebruikerId);
        }
    }
}