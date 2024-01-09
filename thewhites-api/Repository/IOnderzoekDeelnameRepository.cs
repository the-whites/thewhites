using AspTest.Models;

namespace AspTest.Repository
{
    public interface IOnderzoekDeelnameRepository
    {
        int GetTotalOnderzoekDeelnemers(Onderzoek onderzoek);
    }
}