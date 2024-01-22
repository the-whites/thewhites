using AspTest.Models;

namespace AspTest.Repository
{
    public interface IGebruikerRepository
    {
        Gebruiker? GetGebruikerById(int gebruikerId);
        Gebruiker? GetGebruikerByGoogleId(string googleId);
        ICollection<Gebruiker> GetGebruikers();

        Task<Gebruiker> CreateGebruiker(string voornaam, string achternaam, string googleid, string emailadres, string rol = "ervaringsdeskundige");
        IQueryable<Gebruiker> GetGebruikersWithQueryable();
        void DeleteGebruiker(Gebruiker gebruiker);
    }
}