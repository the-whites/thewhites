using AspTest.Models;

namespace AspTest.Repository
{
    public interface IBeperkingRepository
    {
        ICollection<Beperking> GetBeperkingen();
        Beperking? GetBeperkingById(int beperkingId);
        Task<ErvaringsdeskundigeBeperking> AddBeperkingBijGebruiker(Ervaringsdeskundige ervaringsdeskundige, Beperking beperking, bool withSaveChange = true);
        Task ClearBeperkingenGebruiker(Ervaringsdeskundige ervaringsdeskundige, bool withSaveChange = true);
        Task AddMultipleBeperkingTypeGebruiker(
            Ervaringsdeskundige ervaringsdeskundige, 
            ICollection<int> beperkingTypeIds, 
            bool withSaveChange = true
        );
    }
}