using AspTest.Models;

namespace AspTest
{
    public interface IGebruikerRepository
    {
        Gebruiker GetGebruiker(int gebruikerId);
    }
}