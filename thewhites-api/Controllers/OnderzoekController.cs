using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
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

        public OnderzoekController(IOnderzoekRepository onderzoekRepository, IBedrijfRepository bedrijfRepository, IBeperkingRepository beperkingRepository, IOnderzoekTypeRepository onderzoekTypeRepository, IOnderzoekDeelnameRepository onderzoekDeelnameRepository)
        {
            this.onderzoekRepository = onderzoekRepository;
            this.bedrijfRepository = bedrijfRepository;
            this.beperkingRepository = beperkingRepository;
            this.onderzoekTypeRepository = onderzoekTypeRepository;
            this.onderzoekDeelnameRepository = onderzoekDeelnameRepository;
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

            // TODO add RBAC via authorization header
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfByUserId(userId);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            ICollection<OnderzoekCategories> onderzoekCategoriesList = CriteriaListMapper.MapCriteriaList(onderzoek.categoriesList, categorieId => new OnderzoekCategories { Type = onderzoekTypeRepository.GetOnderzoekTypeById(categorieId) });
            ICollection<OnderzoekPostcodeCriteria> onderzoekPostcodeCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.postcodeCriteriaList, postcode => new OnderzoekPostcodeCriteria { Postcode = postcode });
            ICollection<OnderzoekLeeftijdCriteria> onderzoekLeeftijdCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.leeftijdCriteriaList, leeftijd => new OnderzoekLeeftijdCriteria { MinLeeftijd = leeftijd.Item1, MaxLeeftijd = leeftijd.Item2 });

            ICollection<OnderzoekBeperkingCriteria> onderzoekBeperkingCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.beperkingCriteriaList, beperking => new OnderzoekBeperkingCriteria { Beperking = beperkingRepository.GetBeperkingById(beperking) });

            if (onderzoekCategoriesList.Any(oc => oc.Type == null))
            {
                return NotFound("Een of meedere onderzoekcategorieen.");
            }

            if(onderzoekBeperkingCriteriaList.Any(obc => obc.Beperking == null))
            {
                return NotFound("Een of meerdere beperkingen bestaan niet.");
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

            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfByUserId(userId);

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
    }
}