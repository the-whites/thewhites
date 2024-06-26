using AspTest.Models;

namespace AspTest.Repository
{
    public interface IOnderzoekDeelnameRepository
    {
        ICollection<OnderzoekDeelname>? GetOnderzoekDeelnemers(Onderzoek onderzoek);
        ICollection<Onderzoek> GetDeelnemerOnderzoeken(Ervaringsdeskundige deelnemer);
    }
}