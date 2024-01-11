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

        public ICollection<OnderzoekDeelname> GetOnderzoekDeelnemers(Onderzoek onderzoek)
        {
            return _context.OnderzoekDeelnames.ToList().FindAll(p => p.Onderzoek == onderzoek);
        }
    }
}