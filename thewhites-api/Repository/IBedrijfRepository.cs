using AspTest.Models;

namespace AspTest
{
    public interface IBedrijfRepository
    {
        Bedrijf? GetBedrijfById(int bedrijfId);
    }
}