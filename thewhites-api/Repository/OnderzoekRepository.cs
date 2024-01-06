using AspTest.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspTest.Repository
{
    public class OnderzoekRepository : IOnderzoekRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekRepository(AspDbContext context)
        {
            _context = context;
        }

        public async Task CreateOnderzoek(Onderzoek onderzoek)
        {
            _context.Onderzoeken.Add(onderzoek);
            
            await _context.SaveChangesAsync();
        }

        public ICollection<Onderzoek> GetOnderzoeken()
        {
            return _context.Onderzoeken
                .Include(o => o.Bedrijf)
                .Include(o => o.OnderzoekCategories)
                    .ThenInclude(oc => oc.Type)
                .Include(o => o.BeperkingCriteria)
                    .ThenInclude(bc => bc.Beperking)
                .Include(o => o.LeeftijdCriteria)
                .Include(o => o.PostcodeCriteria)
                .ToList();
        }
    }
}