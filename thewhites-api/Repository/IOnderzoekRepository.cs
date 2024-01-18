using AspTest.Models;

namespace AspTest.Repository
{
    public interface IOnderzoekRepository
    {
        Task CreateOnderzoek(Onderzoek onderzoek);
        
        ICollection<Onderzoek> GetOnderzoeken();
        ICollection<Onderzoek> GetOnderzoekenByBedrijf(Bedrijf bedrijf);
        Onderzoek? GetOnderzoekByOnderzoekId(int onderzoekId);
        IQueryable<Onderzoek> GetOnderzoekenWithQueryable();
        Task AddErvaringsdeskundigeAanOnderzoek(Ervaringsdeskundige ervDeskundige, Onderzoek onderzoek);
        Task UpdateOnderzoek(Onderzoek onderzoek, Onderzoek newOnderzoek);
    }
}