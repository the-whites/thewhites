using AspTest.Config;
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

        public ICollection<Onderzoek> GetOnderzoekenByBedrijf(Bedrijf bedrijf)
        {
            return _context.Onderzoeken
                .Include(o => o.Bedrijf)
                .Include(o => o.OnderzoekCategories)
                    .ThenInclude(oc => oc.Type)
                .Include(o => o.BeperkingCriteria)
                    .ThenInclude(bc => bc.Beperking)
                .Include(o => o.LeeftijdCriteria)
                .Include(o => o.PostcodeCriteria)
                .Where(o => o.BedrijfId == bedrijf.Id)
                .ToList();
        }

        public Onderzoek? GetOnderzoekByOnderzoekId(int onderzoekId)
        {
            return _context.Onderzoeken
                .Include(o => o.Bedrijf)
                .Include(o => o.OnderzoekCategories)
                    .ThenInclude(oc => oc.Type)
                .Include(o => o.BeperkingCriteria)
                    .ThenInclude(bc => bc.Beperking)
                .Include(o => o.LeeftijdCriteria)
                .Include(o => o.PostcodeCriteria)
                .Where(o => o.Id == onderzoekId)
                .FirstOrDefault();
        }

        public async Task AddErvaringsdeskundigeAanOnderzoek(Ervaringsdeskundige ervDeskundige, Onderzoek onderzoek)
        {
            var foundOnderzoek = _context.Onderzoeken.Include(o => o.OnderzoekDeelname).ToList().FirstOrDefault(onderzoek);
        
            if (foundOnderzoek == null)
                throw new InvalidOnderzoekException("Onderzoek was invalid.");
            
            var deelname = new OnderzoekDeelname();
            deelname.Ervaringsdeskundige = ervDeskundige;
            deelname.Onderzoek = onderzoek;

            _context.OnderzoekDeelnames.Add(deelname);

            await _context.SaveChangesAsync();
        }

        public IQueryable<Onderzoek> GetOnderzoekenWithQueryable()
        {
            return _context.Onderzoeken;
        }

        public async Task UpdateOnderzoek(Onderzoek onderzoek, Onderzoek updatedOnderzoek)
        {
            var originalOnderzoek = await _context.Onderzoeken.FindAsync(onderzoek.Id);

            if (originalOnderzoek == null)
            {
                throw new InvalidOperationException("The original Onderzoek entity is not found.");
            }

            originalOnderzoek.Titel = updatedOnderzoek.Titel;
            originalOnderzoek.Beschrijving = updatedOnderzoek.Beschrijving;
            originalOnderzoek.Inhoud = updatedOnderzoek.Inhoud;
            originalOnderzoek.Locatie = updatedOnderzoek.Locatie;
            originalOnderzoek.StartDatum = updatedOnderzoek.StartDatum;
            originalOnderzoek.EindDatum = updatedOnderzoek.EindDatum;
            originalOnderzoek.Beloning = updatedOnderzoek.Beloning;
            originalOnderzoek.BeperkingCriteria = updatedOnderzoek.BeperkingCriteria;
            originalOnderzoek.OnderzoekCategories = updatedOnderzoek.OnderzoekCategories;
            originalOnderzoek.PostcodeCriteria = updatedOnderzoek.PostcodeCriteria;
            originalOnderzoek.LeeftijdCriteria = updatedOnderzoek.LeeftijdCriteria;

            await _context.SaveChangesAsync();
        }
    }
}