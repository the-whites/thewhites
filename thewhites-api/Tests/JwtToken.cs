using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using AspTest.Models;
using AspTest.Services;
using Xunit;

namespace AspTest.Test {
    public class JwtTokenTests
    {

        public JwtTokenTests() {
            // Initialize JWT_SECRET
            Environment.SetEnvironmentVariable("JWT_SECRET", "this is my testing Secret key for authentication");
        }
        
        [Fact]
        public void TestGenereerJwtToken_GenerateJwtToken_IsTrue()
        {
            // Arrange
            Gebruiker testGebruiker = new Gebruiker() {
                Id = 1,
                Emailadres = "test@gmail.com",
                Voornaam = "John",
                Achternaam = "Doe"
            };


            // Act
            var token = IdentityService.GenerateJwtToken("", testGebruiker);
            var handler = new JwtSecurityTokenHandler(); // Decode, zodat we het kunnen lezen
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;// Decode, zodat we het kunnen lezen

            //Assert
            Assert.NotNull(jsonToken);
            Assert.Contains(jsonToken.Claims, claim => claim.Type.Contains("user_id") && claim.Value.Equals(testGebruiker.Id.ToString()));
            Assert.Contains(jsonToken.Claims, claim => claim.Type.Contains("user_email") && claim.Value.Equals(testGebruiker.Emailadres));
            Assert.Contains(jsonToken.Claims, claim => claim.Type.Contains("user_given_name") && claim.Value.Equals(testGebruiker.Voornaam));
            Assert.Contains(jsonToken.Claims, claim => claim.Type.Contains("user_family_name") && claim.Value.Equals(testGebruiker.Achternaam));
        }
    }
}