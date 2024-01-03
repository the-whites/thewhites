using AspTest.Models;

namespace AspTest.Repository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AspDbContext _context;

        public RefreshTokenRepository(AspDbContext context)
        {
            _context = context;
        }

        public async Task<RefreshToken> CreateRefreshToken(string token, Gebruiker gebruiker, DateTime expiresOn)
        {
            RefreshToken _token = new RefreshToken();
            _token.Token = token;
            _token.Expires = expiresOn;
            _token.Created = DateTime.Now;
            _token.Gebruiker = gebruiker;

            
            _token.Gebruiker = gebruiker;

            _context.RefreshTokens.Add(_token);

            await _context.SaveChangesAsync();

            return _token;
        }

        public async Task DeleteRefreshToken(RefreshToken token)
        {
            _context.RefreshTokens.Remove(token);
            
            await _context.SaveChangesAsync();

        }
    }
}