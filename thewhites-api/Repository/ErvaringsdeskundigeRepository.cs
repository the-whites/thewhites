using AspTest.Models;
using Microsoft.EntityFrameworkCore;

namespace AspTest.Repository
{
    public class ErvaringsdeskundigeRepository : IErvaringsdeskundigeRepository
    {
        private readonly AspDbContext _context;
        private readonly ILogger<ErvaringsdeskundigeRepository> _logger;
        public ErvaringsdeskundigeRepository(AspDbContext context, ILogger<ErvaringsdeskundigeRepository> logger)
        {
            _context = context;
            _logger = logger;

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
            public async Task<IEnumerable<ErvaringsdeskundigeDTO>> GetAllErvaringsdeskundigenDetailsAsync()
            {
                return await _context.Ervaringsdeskundigen
                    .Select(e => new ErvaringsdeskundigeDTO
                    {
                        Id = e.Id,
                        Postcode = e.Postcode,
                        Telefoonnummer = e.Telefoonnummer,
                        Gebruikersnaam = e.Gebruiker.Voornaam + " " + e.Gebruiker.Achternaam,
                        Hulpmiddel = e.Hulpmiddel,
                        Ziekte = e.Ziekte,
                        Beschikbaarheid = e.Beschikbaarheid,
                        Geboortedatum = e.Geboortedatum,
                        GebruikerId = e.GebruikerId
                    })
                    .ToListAsync();
            }

        }
}