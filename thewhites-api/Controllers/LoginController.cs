
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Newtonsoft.Json.Linq;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using AspTest.Models;
using AspTest.Services;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using AspTest.Repository;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IOnderzoekTypeRepository _onderzoekTypeRepository;
        private readonly IErvaringsdeskundigeRepository _ervaringsdeskundigeRepository;
        private readonly IBeperkingRepository _beperkingRepository;
        private readonly AspDbContext _context;

        public LoginController(
            AspDbContext context, 
            IGebruikerRepository gebruikerRepository, 
            IRefreshTokenRepository refreshTokenRepository, 
            IOnderzoekTypeRepository onderzoekTypeRepository, 
            IErvaringsdeskundigeRepository ervaringsdeskundigeRepository,
            IBeperkingRepository beperkingRepository
        )
        {
            _context = context;
            _gebruikerRepository = gebruikerRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _onderzoekTypeRepository = onderzoekTypeRepository;
            _ervaringsdeskundigeRepository = ervaringsdeskundigeRepository;
            _beperkingRepository = beperkingRepository;
        }

        // Hier kan een gebruiker m.b.v. de credentials vanuit de frontend (GoogleLogin component) deze route aanroepen, om een sessie-token te verkrijgen.
        // Met deze sessie-token kan er over de site genavigeerd worden.
        // TODO: sessie-token in cookies, zodat je niet constant de Bearer <token> header moet geven per authorized API call.
        [HttpPost("login_google")]
        public async Task<IActionResult> GoogleLogin([FromBody] LoginGoogleModel test)
        {
            // Validate Google credentials
            var payload = await IdentityService.ValidateGoogleCredentialsAsync(test);
            
            if (payload == null)
            {
                return BadRequest("Invalid Google credentials");
            }

            // Checken of gebruiker bestaat, zo niet dan maak een nieuwe gebruiker aan.
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerByGoogleId(payload.Subject);

            // Register stukje
            if (gebruiker == null)
            {
                // Maak gebruiker
                gebruiker = await _gebruikerRepository.CreateGebruiker(payload.GivenName, payload.FamilyName, payload.Subject, payload.Email);

                // TEMPORARY: maak test data alvast (omdat we nog geen register informatie kunnen verkrijgen)
                var result = await CreateTestDataVoorRegistratie(gebruiker);

                if (result != null)
                    return result;
            }

            // Maak een token
            var token = IdentityService.GenerateJwtToken(payload, gebruiker);


            var refreshToken = await _refreshTokenRepository.CreateRefreshToken(
                Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                gebruiker,
                DateTime.Now.AddDays(1)
            );

            Response.Cookies.Append("refresh_token", refreshToken.Token, new CookieOptions {
                HttpOnly = true,
                Expires = refreshToken.Expires,
                SameSite = SameSiteMode.Strict,
                Secure = true
            });

            // Return de gemaakte token
            return Ok(new {token = token});
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            //Response.Cookies.Delete("ac_token");
            Response.Cookies.Delete("refresh_token");

            return Ok();
        }

        //[Authorize]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenBodyModel oldTokenModel)
        {
            string refreshToken = Request.Cookies["refresh_token"] ?? "";

            // TODO: check max length
            if (refreshToken.Length < 1)
                return BadRequest("Invalid refresh token. Reset cookies and re-authenticate.");
            
            if (oldTokenModel.oldToken == null || oldTokenModel.oldToken.Equals(""))
                return BadRequest("Invalid access token.");

            ClaimsPrincipal? tokenPrincipalStore = IdentityService.ValidateAndGetExpiredJwtToken(oldTokenModel.oldToken);
            string? userIdString = tokenPrincipalStore?.FindFirstValue("user_id");

            if (userIdString == null)
                return Unauthorized("Invalid token.");


            bool result = int.TryParse(userIdString, out int userId);

            if (result)
            {
                Gebruiker? gebruiker = _gebruikerRepository.GetGebruikersWithQueryable().Include(g => g.RefreshTokens).FirstOrDefault(g => g.Id == userId);


                if (gebruiker == null)
                    return Unauthorized("No user found.");

                // Checken of de refresh token verkregen uit de cookie echt bestaat in onze database
                RefreshToken? foundRefreshToken = gebruiker.RefreshTokens.FirstOrDefault(rf => rf.Token.Equals(refreshToken));
                
                if (foundRefreshToken == null)
                    return Unauthorized("Invalid refresh token.");
                
                if (foundRefreshToken.Expires < DateTime.Now)
                    return Unauthorized("Token expired.");
                
                if (gebruiker.GoogleId == null)
                    return Unauthorized("No google account was found.");

                // Delete old refresh token
                //await _refreshTokenRepository.DeleteRefreshToken(foundRefreshToken);

                string newJwtToken = IdentityService.GenerateJwtToken(gebruiker.GoogleId, gebruiker);

                return Ok(new {token = newJwtToken});
            }
            else
            {
                return BadRequest("Something went wrong while parsing the user id.");
            }
        }

        public async Task<IActionResult?> CreateTestDataVoorRegistratie(Gebruiker gebruiker)
        {
            await _ervaringsdeskundigeRepository.CreateErvaringsdeskundigeVoorGebruiker(
                    gebruiker,
                    "1234AB",
                    "0612345678",
                    "test",
                    new DateTime(2024, 1, 6),
                    "knuppel",
                    "hoofdpijn van die mannetjes",
                    false
                );

            Console.WriteLine("CREATING TEST DATA");
            // Maak alvast ervaringsdeskundige, omdat we dit nodig hebben bij de volgende twee queries.
            await _context.SaveChangesAsync();

            await _gebruikerRepository.AddBenaderingVoorkeurGebruiker(gebruiker, true, false, true, false);

            OnderzoekType? onderzoekType = _onderzoekTypeRepository.GetOnderzoekTypeById(2);

            if (onderzoekType == null)
                return StatusCode(500, "Could not create temporary register info. Check LoginController. onderzoekType not found.");
            
            Beperking? beperking = _beperkingRepository.GetBeperkingById(2);
        
            if (beperking == null)
                return StatusCode(500, "Could not create temporary register info. Check LoginController. beperking not found.");

            await _gebruikerRepository.AddVoorkeurOnderzoekTypeGebruiker(gebruiker, onderzoekType, false);
            await _beperkingRepository.AddBeperkingBijGebruiker(gebruiker, beperking, false);

            await _context.SaveChangesAsync();

            return null;
        }

        // Met deze route kun je checken of je ingelogd ben en verkrijg je jouw lokale id en google id.
        [Authorize]
        [HttpGet("profileInfo")]
        public IActionResult GetUserProfileInfo()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);

            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if (gebruiker == null)
                return Unauthorized("No user found.");

            var profile = new {
                id = gebruiker.Id,
                voornaam = gebruiker.Voornaam,
                achternaam = gebruiker.Achternaam,
                email = gebruiker.Emailadres,
                rol = gebruiker.Rol
            };
            return Ok(profile);
        }
    }
}