using AspTest.Models;

namespace AspTest
{
    public interface IOnderzoekRepository
    {
        Task<Onderzoek> CreateOnderzoek(
            string titel, 
            string beschrijving, 
            Bedrijf bedrijf, 
            DateTime startdatum, 
            DateTime einddatum, 
            string locatie,
            ICollection<OnderzoekBeperkingCriteria> beperkingCriteria,
            ICollection<OnderzoekLeeftijdCriteria> leeftijdCriteria,
            ICollection<OnderzoekPostcodeCriteria> postcodeCriteria);
        
        ICollection<Onderzoek> GetOnderzoeken();
    }
}