using AspTest.Models;

namespace AspTest.Repository
{
    public class BeperkingRepository : IBeperkingRepository
    {
        private readonly AspDbContext _context;

        public BeperkingRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<Beperking> GetBeperkingen ()
        {
            return _context.Beperkingen.ToList();
        }

        public Beperking? GetBeperkingById (int beperkingId)
        {
            return _context.Beperkingen.ToList().Find(p => p.Id == beperkingId);
        }

        public async Task<ErvaringsdeskundigeBeperking> AddBeperkingBijGebruiker(Gebruiker gbrErvaringsdeskundige, Beperking beperking, bool withSaveChange = true)
        {
            var ervaringsdeskundige = gbrErvaringsdeskundige.Ervaringsdeskundige;

            if (ervaringsdeskundige == null)
                throw new Exception("Could not create ErvaringsdeskundigeOnderzoekType. Gebruiker does not have an Ervaringsdeskundige.");
            
            if (_context.Beperkingen.ToList().Find(bp => bp == beperking) == null)
                throw new Exception("Could not create ErvaringsdeskundigeBeperking. Gebruiker gave an invalid Beperking.");

            var ervBeperking = new ErvaringsdeskundigeBeperking();

            ervBeperking.Ervaringsdeskundige = ervaringsdeskundige;
            ervBeperking.Beperking = beperking;
  
            _context.ErvaringsdeskundigeBeperkingen.Add(ervBeperking);

            if (withSaveChange)
                await _context.SaveChangesAsync();

            return ervBeperking;
        }
    }
}