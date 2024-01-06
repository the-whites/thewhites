
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AspTest.Models;
using AspTest.Services;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErvaringsDeskundigeController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;

        public ErvaringsDeskundigeController(IGebruikerRepository gebruikerRepository, IRefreshTokenRepository refreshTokenRepository)
        {
            _gebruikerRepository = gebruikerRepository;
        }

        // Met deze route kun je checken of je ingelogd ben en verkrijg je jouw lokale id en google id.
        [Authorize]
        [HttpGet("profiel-info")]
        public IActionResult GetUserProfileInfo()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");
            int.TryParse(UserIdClaim!.Value, out int userId);

            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if (gebruiker == null)
                return Unauthorized("No user found.");

            var profile = new {
                voornaam = gebruiker.Voornaam,
                achternaam = gebruiker.Achternaam,
                email = gebruiker.Emailadres,
                rol = gebruiker.Rol
            };
            return Ok(profile);
        }
    }
}