using AspTest.Models;

namespace AspTest.Repository
{
    public interface IBeperkingRepository
    {
        ICollection<Beperking> GetBeperkingen();
        Beperking? GetBeperkingById(int beperkingId);
        Task<ErvaringsdeskundigeBeperking> AddBeperkingBijGebruiker(Gebruiker gbrErvaringsdeskundige, Beperking beperking, bool withSaveChange = true);
    }
}