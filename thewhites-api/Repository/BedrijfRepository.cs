using AspTest.Models;

namespace AspTest.Repository
{
    public class BedrijfRepository : IBedrijfRepository
    {
        private readonly AspDbContext _context;

        public BedrijfRepository(AspDbContext context)
        {
            _context = context;
        }

        public Bedrijf? GetBedrijfById (int bedrijfId)
        {
            return _context.Bedrijven.ToList().Find(p => p.Id == bedrijfId);
        }
    }
}