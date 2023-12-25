

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AspTest.Models;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;

namespace AspTest.Services
{
    // TODO: misschien geen static class?
    public static class IdentityService
    {
        // Hiermee checken we of de google credentials valid zijn.
        public static async Task<GoogleJsonWebSignature.Payload> ValidateGoogleCredentialsAsync(LoginGoogleModel googleCredentials)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID") }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(googleCredentials.credential, settings);

                return payload;
            }
            catch (InvalidJwtException ex)
            {
                // Log or handle the exception
                return null;
            }
        }

        // Hier wordt de JWT token/sessie-token gemaakt vanuit onze backend. Dit is nodig om geautoriseerde API calls uit te voeren.
        public static string GenerateJwtToken(GoogleJsonWebSignature.Payload payload, string localUserId)
        {
            var secretKey = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "api.dewhites.nl",
                Audience = "dewhites.nl",
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("google_id", payload.Subject),
                    new Claim("user_id", localUserId)
                    
                }),
                Expires = DateTime.UtcNow.AddDays(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}