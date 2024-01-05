using AspTest.Models;

namespace AspTest
{
    public interface IOnderzoekRepository
    {
        Task CreateOnderzoek(Onderzoek onderzoek);
        
        ICollection<Onderzoek> GetOnderzoeken();
    }
}