using AspTest.Config;
using AspTest.Models;
using Microsoft.Data.SqlClient;

namespace AspTest.Repository
{
    public class OnderzoekTypeRepository : IOnderzoekTypeRepository
    {
        private readonly AspDbContext _context;

        public OnderzoekTypeRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<OnderzoekType> GetOnderzoekTypes ()
        {
            return _context.OnderzoekType.ToList();
        }

        public OnderzoekType? GetOnderzoekTypeById (int onderzoekTypeId)
        {
            return _context.OnderzoekType.ToList().Find(p => p.Id == onderzoekTypeId);
        }

        public async Task ClearOnderzoekTypesGebruiker(Ervaringsdeskundige ervaringsdeskundige, bool withSaveChange = true)
        {
            var itemsToRemove = _context.ErvaringsdeskundigeVoorkeurOnderzoekTypes.Where(item => item.ErvaringsdeskundigeId == ervaringsdeskundige.Id).ToList();
            _context.ErvaringsdeskundigeVoorkeurOnderzoekTypes.RemoveRange(itemsToRemove);

            if (withSaveChange)
                await _context.SaveChangesAsync();
        }

        public async Task AddMultipleVoorkeurOnderzoekTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            ICollection<int> onderzoekTypeIds, 
            bool withSaveChange = true
        )
        {
            foreach (var onderzoekTypeId in onderzoekTypeIds)
            {
                OnderzoekType? ot = GetOnderzoekTypeById(onderzoekTypeId);

                if (ot == null)
                    throw new InvalidOnderzoekTypesGivenException("onderzoekTypesIds contains an invalid value.");

                await AddVoorkeurOnderzoekTypeGebruiker(ervaringsdeskundige, ot, withSaveChange);
            }
        }

        public async Task<ErvaringsdeskundigeOnderzoekType> AddVoorkeurOnderzoekTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            OnderzoekType onderzoekType,
            bool withSaveChange = true
        )
        {
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

    }
}