
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AspTest.Models;
using AspTest.Services;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using AspTest.Repository;

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

            Gebruiker? gebruiker = _gebruikerRepository
                .GetGebruikersWithQueryable()
                    .Include(g => g.Ervaringsdeskundige)
                        .ThenInclude(ed => ed!.ErvaringsdeskundigeBeperkingen)
                            .ThenInclude(eb => eb.Beperking)

                    .Include(g2 => g2.Ervaringsdeskundige)
                        .ThenInclude(ed => ed!.ErvaringsdeskundigeOnderzoekTypes)
                            .ThenInclude(eo => eo.VoorkeurOnderzoekType)

                    .Include(g3 => g3.Ervaringsdeskundige)
                        .ThenInclude(ed => ed!.ErvaringsdeskundigeVoorkeur)

                    .FirstOrDefault(g4 => g4.Id == userId);

            if (gebruiker == null)
                return Unauthorized("No user found.");
            
            var ervaringsdeskundigeInfo = gebruiker.Ervaringsdeskundige;

            if (ervaringsdeskundigeInfo == null)
                return Unauthorized("No ervaringsdeskundige info found.");
            
            var _beperkingTypes = ervaringsdeskundigeInfo.ErvaringsdeskundigeBeperkingen.Select(
                x => new { id = x.BeperkingId, naam = x.Beperking.Naam, omschrijving = x.Beperking.Omschrijving }
            );
            var _onderzoekTypes = ervaringsdeskundigeInfo.ErvaringsdeskundigeOnderzoekTypes.Select(
                x => new { id = x.OnderzoekTypeId, type = x.VoorkeurOnderzoekType.Type, beschrijving = x.VoorkeurOnderzoekType.Beschrijving }
            );

            var profile = new {
                beperkingTypes = _beperkingTypes,
                onderzoekTypes = _onderzoekTypes,
                benaderingVoorkeur = ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur,
                postcode = ervaringsdeskundigeInfo.Postcode,
                telefoonnummer = ervaringsdeskundigeInfo.Telefoonnummer,
                beschikbaarheid = ervaringsdeskundigeInfo.Beschikbaarheid,
                geboortedatum = ervaringsdeskundigeInfo.Geboortedatum,
                hulpmiddel = ervaringsdeskundigeInfo.Hulpmiddel,
                ziekte = ervaringsdeskundigeInfo.Ziekte
            };
            return Ok(profile);
        }
    }
}