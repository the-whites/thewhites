using AspTest.Models;

namespace AspTest.Repository
{
    public interface IGebruikerRepository
    {
        Gebruiker? GetGebruikerById(int gebruikerId);
        Gebruiker? GetGebruikerByGoogleId(string googleId);
        ICollection<Gebruiker> GetGebruikers();

        Task<Gebruiker> CreateGebruiker(string voornaam, string achternaam, string googleid, string emailadres, string rol = "ervaringsdeskundige");
        Task<ErvaringsdeskundigeOnderzoekType> AddVoorkeurOnderzoekTypeGebruiker(Gebruiker gbrErvaringsdeskundige, OnderzoekType onderzoekType, bool withSaveChange = true);
        Task<ErvaringsdeskundigeBenaderingVoorkeur> AddBenaderingVoorkeurGebruiker(Gebruiker gbrErvaringsdeskundige, bool telefonisch, bool portaal, bool toestemmingUitnodigingen, bool withSaveChange = true);
    
        IQueryable<Gebruiker> GetGebruikersWithQueryable();
    }
}