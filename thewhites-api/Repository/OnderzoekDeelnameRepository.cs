using AspTest.Models;

namespace AspTest.Repository
{
    public class OnderzoekDeelnameRepository : IOnderzoekDeelnameRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekDeelnameRepository(AspDbContext context)
        {
            _context = context;
        }

        public int GetTotalOnderzoekDeelnemers(Onderzoek onderzoek)
        {
            return _context.OnderzoekDeelnames
                .Where(od => od.OnderzoekId == onderzoek.Id)
                .Count();
        }
    }
}