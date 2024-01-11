
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AspTest.Models;
using AspTest.Services;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using AspTest.Repository;
using AspTest.Config;
using AspTest.Util;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErvaringsDeskundigeController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;
        private readonly IBeperkingRepository _beperkingRepository;
        private readonly IOnderzoekTypeRepository _onderzoekTypeRepository;
        private readonly AspDbContext _context;

        public ErvaringsDeskundigeController(
            IGebruikerRepository gebruikerRepository, 
            IRefreshTokenRepository refreshTokenRepository,
            IBeperkingRepository beperkingRepository,
            IOnderzoekTypeRepository onderzoekTypeRepository,
            AspDbContext context
        )
        {
            _gebruikerRepository = gebruikerRepository;
            _beperkingRepository = beperkingRepository;
            _onderzoekTypeRepository = onderzoekTypeRepository;
            _context = context;
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

        [Authorize]
        [HttpPost("edit-profiel-info")]
        public async Task<IActionResult> EditUserProfileInfo(EditErvaringsdeskundigeProfielModel model)
        {
            // TODO: optional en required velden validatie
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!GeneralUtils.IsNumeric(model.telefoonnummer))
                return BadRequest("Telefoonnummer input is invalid. Check telefoonnummer input.");

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

            // maak beperking & onderzoek types voor de ervaringsdeskundige leeg
            await _beperkingRepository.ClearBeperkingenGebruiker(ervaringsdeskundigeInfo, false);
            await _onderzoekTypeRepository.ClearOnderzoekTypesGebruiker(ervaringsdeskundigeInfo, false);
            
            // set beperking types
            try {
                await _beperkingRepository.AddMultipleBeperkingTypeGebruiker(ervaringsdeskundigeInfo, model.beperkingTypes, false);
                await _onderzoekTypeRepository.AddMultipleVoorkeurOnderzoekTypeGebruiker(ervaringsdeskundigeInfo, model.onderzoekTypes, false);
            }
            // Niet 500 internal server error als dit gebeurt, maar gewoon badrequest om meer error info te geven.
            catch (InvalidOnderzoekTypesGivenException exception)
            {
                return BadRequest(exception.Message);
            }
            catch (InvalidBeperkingTypesGivenException exception)
            {
                return BadRequest(exception.Message);
            }

            // set overige info
            ervaringsdeskundigeInfo.Telefoonnummer = model.telefoonnummer;
            ervaringsdeskundigeInfo.Beschikbaarheid = model.beschikbaarheid;
            ervaringsdeskundigeInfo.Hulpmiddel = model.hulpmiddelen;
            ervaringsdeskundigeInfo.Ziekte = model.aandoeningZiekte;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.Telefonisch = model.telefonischBenadering;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.Portaal = model.portaalBenadering;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.ToestemmingUitnodigingen = model.comBenadering;

            
            await _context.SaveChangesAsync();
          
            return Ok();
        }
    }
}