using AspTest.Models;

namespace AspTest.Repository
{
    public class ErvaringsdeskundigeRepository : IErvaringsdeskundigeRepository
    {
        private readonly AspDbContext _context;

        public ErvaringsdeskundigeRepository(AspDbContext context)
        {
            _context = context;
        }

        public async Task<Ervaringsdeskundige> CreateErvaringsdeskundigeVoorGebruiker(
            Gebruiker gebruiker, 
            string postcode, 
            string telefoonnummer, 
            string beschikbaarheid, 
            DateTime gebDatum, 
            string hulpmiddel,
            string ziekte,
            bool withSaveChange = true
        )
        {
            if (gebruiker.Ervaringsdeskundige != null)
                throw new Exception("Gebruiker already has an ervaringsdeskundige.");

            Ervaringsdeskundige erv = new Ervaringsdeskundige();
            erv.Gebruiker = gebruiker;
            erv.Postcode = postcode;
            erv.Telefoonnummer = telefoonnummer;
            erv.Beschikbaarheid = beschikbaarheid;
            erv.Geboortedatum = gebDatum;
            erv.Hulpmiddel = hulpmiddel;
            erv.Ziekte = ziekte;
            
            _context.Ervaringsdeskundigen.Add(erv);

            if (withSaveChange)
                await _context.SaveChangesAsync();

            return erv;
        }

        public async Task<ErvaringsdeskundigeBenaderingVoorkeur> AddBenaderingVoorkeurGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            bool telefonisch, 
            bool portaal, 
            bool toestemmingUitnodigingen,
            bool withSaveChange = true
        )
        {
            var ervBenaderingVoorkeur = new ErvaringsdeskundigeBenaderingVoorkeur();

            ervBenaderingVoorkeur.Ervaringsdeskundige = ervaringsdeskundige;
            ervBenaderingVoorkeur.Telefonisch = telefonisch;
            ervBenaderingVoorkeur.Portaal = portaal;
            ervBenaderingVoorkeur.ToestemmingUitnodigingen = toestemmingUitnodigingen;
  
            _context.ErvaringsdeskundigeBenaderingVoorkeuren.Add(ervBenaderingVoorkeur);

            if (withSaveChange)
                await _context.SaveChangesAsync();

            return ervBenaderingVoorkeur;
        }
    }
}