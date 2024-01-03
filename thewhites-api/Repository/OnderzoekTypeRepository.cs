using AspTest.Models;

namespace AspTest.Repository
{
    public class OnderzoekTypeRepository : IOnderzoekTypeRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekTypeRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<OnderzoekType> GetOnderzoekTypes ()
        {
            return _context.OnderzoekType.ToList();
        }

        public OnderzoekType? GetOnderzoekTypeById (int onderzoekTypeId)
        {
            return _context.OnderzoekType.ToList().Find(p => p.Id == onderzoekTypeId);
        }
    }
}