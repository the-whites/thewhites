using AspTest.Config;
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

        public async Task<ErvaringsdeskundigeBeperking> AddBeperkingBijGebruiker(Ervaringsdeskundige ervaringsdeskundige, Beperking beperking, bool withSaveChange = true)
        {
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

        public async Task AddMultipleBeperkingTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            ICollection<int> beperkingTypeIds, 
            bool withSaveChange = true
        )
        {
            foreach (var beperkingTypeId in beperkingTypeIds)
            {
                Beperking? ot = GetBeperkingById(beperkingTypeId);

                if (ot == null)
                    throw new InvalidBeperkingTypesGivenException("beperkingTypeIds contains an invalid value.");

                await AddBeperkingBijGebruiker(ervaringsdeskundige, ot, withSaveChange);
            }
        }

        public async Task ClearBeperkingenGebruiker(Ervaringsdeskundige ervaringsdeskundige, bool withSaveChange = true)
        {
            var itemsToRemove = _context.ErvaringsdeskundigeBeperkingen.Where(item => item.ErvaringsdeskundigeId == ervaringsdeskundige.Id).ToList();
            _context.ErvaringsdeskundigeBeperkingen.RemoveRange(itemsToRemove);

            if (withSaveChange)
                await _context.SaveChangesAsync();
        }
    }
}