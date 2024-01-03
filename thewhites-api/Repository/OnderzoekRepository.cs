using AspTest.Models;

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
                ICollection<OnderzoekBeperkingCriteria> beperkingCriteria,
                ICollection<OnderzoekLeeftijdCriteria> leeftijdCriteria,
                ICollection<OnderzoekPostcodeCriteria> postcodeCriteria)
        {
            Onderzoek onderzoek = new Onderzoek
            {
                Titel = titel,
                Beschrijving = beschrijving,
                Bedrijf = bedrijf,
                StartDatum = startdatum,
                EindDatum = einddatum,
                Locatie = locatie,
                BeperkingCriteria = beperkingCriteria,
                LeeftijdCriteria = leeftijdCriteria,
                PostcodeCriteria = postcodeCriteria
            };

            _context.Onderzoeken.Add(onderzoek);

            await _context.SaveChangesAsync();

            return onderzoek;
        }

        public ICollection<Onderzoek> GetOnderzoeken()
        {
            return _context.Onderzoeken.ToList();
        }
    }
}