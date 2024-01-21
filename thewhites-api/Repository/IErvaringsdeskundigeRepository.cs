using AspTest.Models;

namespace AspTest.Repository
{
    public interface IErvaringsdeskundigeRepository
    {
        Task<Ervaringsdeskundige> CreateErvaringsdeskundigeVoorGebruiker(
            Gebruiker gebruiker, 
            string postcode, 
            string telefoonnummer, 
            string beschikbaarheid, 
            DateTime gebDatum, 
            string hulpmiddel,
            string ziekte,
            bool withSaveChange = true
        );

        Task<ErvaringsdeskundigeBenaderingVoorkeur> AddBenaderingVoorkeurGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            bool telefonisch, 
            bool portaal, 
            bool toestemmingUitnodigingen,
            bool withSaveChange = true
        );
        Task<IEnumerable<Ervaringsdeskundige>> GetAllErvaringsdeskundigenDetailsAsync();
    }
}