using AspTest.Models;

namespace AspTest
{
    public interface IOnderzoekTypeRepository
    {
        ICollection<OnderzoekType> GetOnderzoekTypes();
        OnderzoekType? GetOnderzoekTypeById(int onderzoekTypeId);
    }
}