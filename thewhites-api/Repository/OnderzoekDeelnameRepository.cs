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

        public ICollection<Onderzoek> GetDeelnemerOnderzoeken(Ervaringsdeskundige deelnemer)
        {
            var deelnemerDeelnames =_context.OnderzoekDeelnames
                .Include(od => od.Ervaringsdeskundige)

                // Omdat dit nog een oudere versie van aspnetcore/efcore is, moet dit zo en is er geen AlsoInclude().
                .Include(od => od.Onderzoek)
                    .ThenInclude(o => o.Bedrijf)
                .Include(od => od.Onderzoek)
                    .ThenInclude(o => o.LeeftijdCriteria)
                .Include(od => od.Onderzoek)
                    .ThenInclude(o => o.OnderzoekCategories)
                        .ThenInclude(oc => oc.Type)
                .Include(od => od.Onderzoek)
                    .ThenInclude(o => o.PostcodeCriteria)
                .Include(od => od.Onderzoek)
                    .ThenInclude(o => o.BeperkingCriteria)
                        .ThenInclude(bc => bc.Beperking)

                .Where(p => p.ErvaringsdeskundigeId == deelnemer.Id);
            
            return deelnemerDeelnames.Select((deelname) => deelname.Onderzoek).ToList();
        }
    }
}