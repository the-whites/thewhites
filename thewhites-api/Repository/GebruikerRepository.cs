using AspTest.Models;

namespace AspTest.Repository
{
    public class GebruikerRepository : IGebruikerRepository
    {
        private readonly AspDbContext _context;

        public GebruikerRepository(AspDbContext context)
        {
            _context = context;
        }


        public async Task<Gebruiker> CreateGebruiker(string voornaam, string achternaam, string googleid, string emailadres, string rol = "ervaringsdeskundige")
        {
            Gebruiker gbr = new Gebruiker();
            gbr.Voornaam = voornaam;
            gbr.Achternaam = achternaam;
            gbr.Emailadres = emailadres;
            gbr.GoogleId = googleid;
            gbr.Rol = rol;
            
            _context.Gebruikers.Add(gbr);

            await _context.SaveChangesAsync();

            return gbr;
        }

        public async Task<ErvaringsdeskundigeOnderzoekType> AddVoorkeurOnderzoekTypeGebruiker(
            Gebruiker gbrErvaringsdeskundige, 
            OnderzoekType onderzoekType,
            bool withSaveChange = true
        )
        {
            var ervaringsdeskundige = gbrErvaringsdeskundige.Ervaringsdeskundige;

            if (ervaringsdeskundige == null)
                throw new Exception("Could not create ErvaringsdeskundigeOnderzoekType. Gebruiker does not have an Ervaringsdeskundige.");
            
            if (_context.OnderzoekType.ToList().Find(ot => ot == onderzoekType) == null)
                throw new Exception("Could not create ErvaringsdeskundigeOnderzoekType. Gebruiker gave an invalid OnderzoekType.");

            var ervOnderzoekType = new ErvaringsdeskundigeOnderzoekType();

            ervOnderzoekType.Ervaringsdeskundige = ervaringsdeskundige;
            ervOnderzoekType.VoorkeurOnderzoekType = onderzoekType;
  
            _context.ErvaringsdeskundigeVoorkeurOnderzoekTypes.Add(ervOnderzoekType);

            if (withSaveChange)
                await _context.SaveChangesAsync();

            return ervOnderzoekType;
        }

        public async Task<ErvaringsdeskundigeBenaderingVoorkeur> AddBenaderingVoorkeurGebruiker(
            Gebruiker gbrErvaringsdeskundige, 
            bool telefonisch, 
            bool portaal, 
            bool toestemmingUitnodigingen,
            bool withSaveChange = true
        )
        {
            var ervaringsdeskundige = gbrErvaringsdeskundige.Ervaringsdeskundige;

            if (ervaringsdeskundige == null)
                throw new Exception("Could not create ErvaringsdeskundigeOnderzoekType. Gebruiker does not have an Ervaringsdeskundige.");
            

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

        public Gebruiker? GetGebruikerById(int gebruikerId)
        {
            return _context.Gebruikers.ToList().Find(p => p.Id == gebruikerId);
        }

        public Gebruiker? GetGebruikerByGoogleId(string googleId)
        {
            return _context.Gebruikers.ToList().Find(p => p.GoogleId == googleId);
        }

        public ICollection<Gebruiker> GetGebruikers()
        {
            return _context.Gebruikers.ToList();
        }

        public IQueryable<Gebruiker> GetGebruikersWithQueryable()
        {
            return _context.Gebruikers;
        }
    }
}