
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

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;

        public LoginController(IGebruikerRepository gebruikerRepository)
        {
            _gebruikerRepository = gebruikerRepository;
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

            if (gebruiker != null)
            {
                // Doe niks voor nu
                
            }
            else
            {
                // Maak gebruiker
                gebruiker = await _gebruikerRepository.CreateGebruiker(payload.GivenName, payload.FamilyName, payload.Subject, payload.Email);
            }

            // Maak een token
            var token = IdentityService.GenerateJwtToken(payload, gebruiker.Id.ToString());

            // Return de gemaakte token
            return Ok(new { Token = token });
        }

        // Met deze route kun je checken of je ingelogd ben en verkrijg je jouw lokale id en google id.
        [HttpGet("test/myUserInfo")]
        [Authorize]
        public IActionResult GetUserInfoIfLoggedInTest()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");
            Claim? GoogleIdClaim = User.FindFirst("google_id");


            string UserId = UserIdClaim!.Value ?? "";
            string GoogleId = GoogleIdClaim!.Value ?? "";

            var test = new {

                UserId,
                GoogleId
            };
            return Ok(test);
        }
    }
}