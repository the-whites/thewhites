using AspTest.Models;

namespace AspTest.Repository
{
    public interface IOnderzoekTypeRepository
    {
        ICollection<OnderzoekType> GetOnderzoekTypes();
        OnderzoekType? GetOnderzoekTypeById(int onderzoekTypeId);
    }
}