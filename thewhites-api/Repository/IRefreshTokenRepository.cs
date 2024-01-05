using AspTest.Models;

namespace AspTest
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> CreateRefreshToken(string token, Gebruiker gebruiker, DateTime expiresOn);
        Task DeleteRefreshToken(RefreshToken token);
    }
}