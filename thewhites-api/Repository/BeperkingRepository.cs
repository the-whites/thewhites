using AspTest.Models;

namespace AspTest.Repository
{
    public class BeperkingRepository : IBeperkingRepository
    {
        private readonly AspDbContext _context;

        public BeperkingRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<Beperking> GetBeperkingen ()
        {
            return _context.Beperkingen.ToList();
        }

        public Beperking? GetBeperkingById (int beperkingId)
        {
            return _context.Beperkingen.ToList().Find(p => p.Id == beperkingId);
        }
    }
}