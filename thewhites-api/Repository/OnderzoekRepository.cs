using AspTest.Models;
using Microsoft.EntityFrameworkCore;

namespace AspTest.Repository
{
    public class OnderzoekRepository : IOnderzoekRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekRepository(AspDbContext context)
        {
            _context = context;
        }

        public async Task<Onderzoek> CreateOnderzoek(string titel, 
                string beschrijving, 
                Bedrijf bedrijf, 
                DateTime startdatum, 
                DateTime einddatum, 
                string locatie,
                string beloning,
                ICollection<OnderzoekBeperkingCriteria> beperkingCriteria,
                ICollection<OnderzoekLeeftijdCriteria> leeftijdCriteria,
                ICollection<OnderzoekPostcodeCriteria> postcodeCriteria,
                ICollection<OnderzoekCategories> onderzoekCategories)
        {
            Onderzoek onderzoek = new Onderzoek
            {
                Titel = titel,
                Beschrijving = beschrijving,
                Bedrijf = bedrijf,
                StartDatum = startdatum,
                EindDatum = einddatum,
                Locatie = locatie,
                Beloning = beloning,
                BeperkingCriteria = beperkingCriteria,
                LeeftijdCriteria = leeftijdCriteria,
                PostcodeCriteria = postcodeCriteria,
                OnderzoekCategories = onderzoekCategories
            };

            _context.Onderzoeken.Add(onderzoek);

            await _context.SaveChangesAsync();

            return onderzoek;
        }

        public ICollection<Onderzoek> GetOnderzoeken()
        {
            return _context.Onderzoeken.AsNoTracking()
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