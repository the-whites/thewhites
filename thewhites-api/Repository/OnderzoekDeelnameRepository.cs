using AspTest.Models;
using Microsoft.EntityFrameworkCore;

namespace AspTest.Repository
{
    public class OnderzoekDeelnameRepository : IOnderzoekDeelnameRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekDeelnameRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<OnderzoekDeelname> GetOnderzoekDeelnemers(Onderzoek onderzoek)
        {
            return _context.OnderzoekDeelnames
                .Include(od => od.Ervaringsdeskundige)
                .Where(p => p.Onderzoek == onderzoek)
                .ToList();
        }
    }
}