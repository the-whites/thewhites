using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
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

        public OnderzoekController(IOnderzoekRepository onderzoekRepository, IBedrijfRepository bedrijfRepository, IBeperkingRepository beperkingRepository, IOnderzoekTypeRepository onderzoekTypeRepository)
        {
            this.onderzoekRepository = onderzoekRepository;
            this.bedrijfRepository = bedrijfRepository;
            this.beperkingRepository = beperkingRepository;
            this.onderzoekTypeRepository = onderzoekTypeRepository;
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
        [HttpGet("onderzoeken/{gebruikerId}")]
        public IActionResult GetOnderzoekFromGebruikerId(int gebruikerId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); 

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfByUserId(gebruikerId);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            ICollection<Onderzoek> onderzoekLijst = onderzoekRepository.GetOnderzoekenByBedrijf(bedrijf); 

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

            ICollection<OnderzoekCategories> onderzoekCategoriesList = MapCriteriaList(onderzoek.categoriesList, categorieId => new OnderzoekCategories { Type = onderzoekTypeRepository.GetOnderzoekTypeById(categorieId) });
            ICollection<OnderzoekPostcodeCriteria> onderzoekPostcodeCriteriaList = MapCriteriaList(onderzoek.postcodeCriteriaList, postcode => new OnderzoekPostcodeCriteria { Postcode = postcode });
            ICollection<OnderzoekLeeftijdCriteria> onderzoekLeeftijdCriteriaList = MapCriteriaList(onderzoek.leeftijdCriteriaList, leeftijd => new OnderzoekLeeftijdCriteria { Leeftijd = leeftijd });
            ICollection<OnderzoekBeperkingCriteria> onderzoekBeperkingCriteriaList = MapCriteriaList(onderzoek.beperkingCriteriaList, beperking => new OnderzoekBeperkingCriteria { Beperking = beperkingRepository.GetBeperkingById(beperking) });

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

        private List<T> MapCriteriaList<T, U>(List<U> sourceList, Func<U, T> mappingFunction)
        {
            return sourceList?.Select(mappingFunction).ToList() ?? new List<T>();
        }

    }
}