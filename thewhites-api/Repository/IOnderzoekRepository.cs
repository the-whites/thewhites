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
            string beloning,
            ICollection<OnderzoekBeperkingCriteria> beperkingCriteria,
            ICollection<OnderzoekLeeftijdCriteria> leeftijdCriteria,
            ICollection<OnderzoekPostcodeCriteria> postcodeCriteria,
            ICollection<OnderzoekCategories> onderzoekCategories);
        
        ICollection<Onderzoek> GetOnderzoeken();
    }
}