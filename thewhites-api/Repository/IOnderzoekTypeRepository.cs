using AspTest.Models;

namespace AspTest.Repository
{
    public interface IOnderzoekTypeRepository
    {
        ICollection<OnderzoekType> GetOnderzoekTypes();
        OnderzoekType? GetOnderzoekTypeById(int onderzoekTypeId);
        Task ClearOnderzoekTypesGebruiker(Ervaringsdeskundige ervaringsdeskundige, bool withSaveChange = true);
        Task<ErvaringsdeskundigeOnderzoekType> AddVoorkeurOnderzoekTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            OnderzoekType onderzoekType,
            bool withSaveChange = true
        );

        Task AddMultipleVoorkeurOnderzoekTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            ICollection<int> onderzoekTypeIds, 
            bool withSaveChange = true
        );
    }
}