using AspTest.Models;

namespace AspTest
{
    public interface IBeperkingRepository
    {
        ICollection<Beperking> GetBeperkingen();
        Beperking? GetBeperkingById(int beperkingId);
    }
}