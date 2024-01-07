using AspTest.Models;

namespace AspTest.Repository
{
    public interface IBedrijfRepository
    {
        Bedrijf? GetBedrijfById(int bedrijfId);
        Bedrijf? GetBedrijfByUserId(int userId);
    }
}