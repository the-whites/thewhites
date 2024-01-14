
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
        private readonly IOnderzoekRepository _onderzoekRepository;
        private readonly AspDbContext _context;
        private readonly OnderzoekService _onderzoekService;

        public ErvaringsDeskundigeController(
            IGebruikerRepository gebruikerRepository, 
            IRefreshTokenRepository refreshTokenRepository,
            IBeperkingRepository beperkingRepository,
            IOnderzoekTypeRepository onderzoekTypeRepository,
            IOnderzoekRepository onderzoekRepository,
            AspDbContext context,
            OnderzoekService onderzoekService
        )
        {
            _gebruikerRepository = gebruikerRepository;
            _beperkingRepository = beperkingRepository;
            _onderzoekTypeRepository = onderzoekTypeRepository;
            _onderzoekRepository = onderzoekRepository;
            _context = context;
            _onderzoekService = onderzoekService;
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

        [Authorize]
        [HttpPost("onderzoek-deelnemen/{onderzoekId}")]
        public async Task<IActionResult> NeemDeelAanOnderzoek(int onderzoekId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
            
            var onderzoek = _onderzoekRepository.GetOnderzoekenWithQueryable()
                .Include(o => o.OnderzoekDeelname)
                .Include(o => o.LeeftijdCriteria)
                .Include(o => o.OnderzoekCategories)
                .Include(o => o.PostcodeCriteria)
                .Include(o => o.BeperkingCriteria)
                .FirstOrDefault(o => o.Id == onderzoekId);

            if (onderzoek == null)
                return Unauthorized("No onderzoek found.");

            if (onderzoek.OnderzoekDeelname.Any(od => od.Ervaringsdeskundige == ervaringsdeskundigeInfo))
                return Unauthorized("You are already enrolled in this onderzoek.");

            if (onderzoek.EindDatum.Ticks < DateTime.Now.Ticks)
                return Unauthorized("Onderzoek is finished.");
            
            var isEligibleForOnderzoek = _onderzoekService.IsErvaringsdeskundigeBinnenCriteria(ervaringsdeskundigeInfo, onderzoek, out string reden);

            if (!isEligibleForOnderzoek)
                return Unauthorized(reden);

            await _onderzoekRepository.AddErvaringsdeskundigeAanOnderzoek(ervaringsdeskundigeInfo, onderzoek);

            return Ok();
        }
        
        /*
        [Authorize]
        [HttpPost("create-profiel-info")]
        public async Task<IActionResult> CreateUserProfileInfo([FromBody] CreateErvaringsdeskundigeProfielModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
            ervaringsdeskundigeInfo.Telefoonnummer = model.Telefoonnummer;
            ervaringsdeskundigeInfo.Beschikbaarheid = model.Beschikbaar;
            ervaringsdeskundigeInfo.Hulpmiddel = model.Hulpmiddelen;
            ervaringsdeskundigeInfo.Ziekte = model.Aandoening;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.Telefonisch = model.TelefonischBenadering;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.Portaal = model.PortaalBenadering;
            ervaringsdeskundigeInfo.ErvaringsdeskundigeVoorkeur.ToestemmingUitnodigingen = model.comBenadering;

            
            await _context.SaveChangesAsync();
          
            return Ok();
        }
        }
    }