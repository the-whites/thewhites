using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
using AspTest.Services;
using AspTest.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// WIP
namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekController : Controller
    {
        private readonly IOnderzoekRepository onderzoekRepository;
        private readonly IBedrijfRepository bedrijfRepository;
        private readonly IBeperkingRepository beperkingRepository;
        private readonly IOnderzoekTypeRepository onderzoekTypeRepository;
        private readonly IOnderzoekDeelnameRepository onderzoekDeelnameRepository;
        private readonly OnderzoekService onderzoekService;

        public OnderzoekController(
            IOnderzoekRepository onderzoekRepository, 
            IBedrijfRepository bedrijfRepository, 
            IBeperkingRepository beperkingRepository, 
            IOnderzoekTypeRepository onderzoekTypeRepository, 
            IOnderzoekDeelnameRepository onderzoekDeelnameRepository,
            OnderzoekService onderzoekService)
        {
            this.onderzoekRepository = onderzoekRepository;
            this.bedrijfRepository = bedrijfRepository;
            this.beperkingRepository = beperkingRepository;
            this.onderzoekTypeRepository = onderzoekTypeRepository;
            this.onderzoekDeelnameRepository = onderzoekDeelnameRepository;
            this.onderzoekService = onderzoekService;
        }

        [HttpGet("onderzoeken")]
        public IActionResult GetOnderzoeken()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            ICollection<Onderzoek> onderzoekLijst = onderzoekRepository.GetOnderzoeken(); 

            return Ok(onderzoekLijst);
        }

        [Authorize]
        [HttpPost("create-onderzoek")]
        public async Task<IActionResult> CreateOnderzoek([FromBody] OnderzoekBodyModel onderzoek)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Bedrijf? bedrijf = onderzoekService.GetBedrijfByUserId(User);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            var validationResult = onderzoekService.ValidateAndMapCriteriaLists(onderzoek,
                out ICollection<OnderzoekCategories> onderzoekCategoriesList,
                out ICollection<OnderzoekPostcodeCriteria> onderzoekPostcodeCriteriaList,
                out ICollection<OnderzoekLeeftijdCriteria> onderzoekLeeftijdCriteriaList,
                out ICollection<OnderzoekBeperkingCriteria> onderzoekBeperkingCriteriaList,
                out string reden);

            if (!validationResult)
            {
                return BadRequest(reden);
            }

            if (onderzoekCategoriesList.Any(oc => oc.Type == null))
            {
                return NotFound("Een of meedere onderzoekcategorieen bestaan niet.");
            }

            if(onderzoekBeperkingCriteriaList.Any(obc => obc.Beperking == null))
            {
                return NotFound("Een of meerdere beperkingen bestaan niet.");
            }

            foreach(var leeftijdCriteria in onderzoekLeeftijdCriteriaList) 
            {
                if(leeftijdCriteria.MinLeeftijd > leeftijdCriteria.MaxLeeftijd)
                {
                    return BadRequest($"Min ({leeftijdCriteria.MinLeeftijd}) leeftijd is groter dan max leeftijd ({leeftijdCriteria.MaxLeeftijd})");
                }
            }

            Onderzoek newOnderzoek = new Onderzoek
            {
                Titel = onderzoek.titel,
                Beschrijving = onderzoek.beschrijving,
                Inhoud = onderzoek.inhoud,
                StartDatum = onderzoek.startDatum,
                EindDatum = onderzoek.eindDatum,
                Bedrijf = bedrijf,
                Beloning = onderzoek.beloning,
                Locatie = onderzoek.locatie,
                GemaaktOp = DateTime.Now,
                OnderzoekCategories = onderzoekCategoriesList,
                PostcodeCriteria = onderzoekPostcodeCriteriaList,
                LeeftijdCriteria = onderzoekLeeftijdCriteriaList,
                BeperkingCriteria = onderzoekBeperkingCriteriaList
            };

            await onderzoekRepository.CreateOnderzoek(newOnderzoek);
            return Ok();
        }

        [Authorize]
        [HttpGet("{onderzoekId}/deelnemers")]
        public async Task<IActionResult> GetOnderzoekDeelnemers(int onderzoekId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Bedrijf? bedrijf = onderzoekService.GetBedrijfByUserId(User);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            Onderzoek onderzoek = onderzoekRepository.GetOnderzoekByOnderzoekId(onderzoekId);

            if(onderzoek == null || onderzoek.Bedrijf != bedrijf)
            {
                return Unauthorized("Gebruiker heeft geen toegang naar dit onderzoek");
            }

            var deelnemers = onderzoekDeelnameRepository.GetOnderzoekDeelnemers(onderzoek);

            if(deelnemers == null)
            {
                return NotFound("Geen deelnemers gevonden");
            }

            return Ok(deelnemers);
        }

        [Authorize]
        [HttpPost("wijzig/{onderzoekId}")]
        public async Task<IActionResult> EditOnderzoek([FromBody] OnderzoekBodyModel onderzoek, [FromRoute] int onderzoekId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Bedrijf? bedrijf = onderzoekService.GetBedrijfByUserId(User);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            Onderzoek? originalOnderzoek = onderzoekRepository.GetOnderzoekByOnderzoekId(onderzoekId);

            if(originalOnderzoek == null || originalOnderzoek.Bedrijf != bedrijf)
            {
                return Unauthorized("Gebruiker heeft geen toegang naar dit onderzoek");
            }

            var validationResult = onderzoekService.ValidateAndMapCriteriaLists(onderzoek,
                out ICollection<OnderzoekCategories> onderzoekCategoriesList,
                out ICollection<OnderzoekPostcodeCriteria> onderzoekPostcodeCriteriaList,
                out ICollection<OnderzoekLeeftijdCriteria> onderzoekLeeftijdCriteriaList,
                out ICollection<OnderzoekBeperkingCriteria> onderzoekBeperkingCriteriaList,
                out string reden);

            if (!validationResult)
            {
                return BadRequest(reden);
            }

            Onderzoek newOnderzoek = new Onderzoek
            {
                Titel = onderzoek.titel,
                Beschrijving = onderzoek.beschrijving,
                Inhoud = onderzoek.inhoud,
                StartDatum = onderzoek.startDatum,
                EindDatum = onderzoek.eindDatum,
                Bedrijf = originalOnderzoek.Bedrijf,
                Beloning = onderzoek.beloning,
                Locatie = onderzoek.locatie,
                OnderzoekCategories = onderzoekCategoriesList,
                PostcodeCriteria = onderzoekPostcodeCriteriaList,
                LeeftijdCriteria = onderzoekLeeftijdCriteriaList.Where(leeftijd => leeftijd.MinLeeftijd != 0 || leeftijd.MaxLeeftijd != 0).ToList(),
                BeperkingCriteria = onderzoekBeperkingCriteriaList
            };

            await onderzoekRepository.UpdateOnderzoek(originalOnderzoek, newOnderzoek);
            return Ok();
        }
    }
}