using AspTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekController : Controller
    {
        private readonly IOnderzoekRepository onderzoekRepository;
        private readonly IBedrijfRepository bedrijfRepository;
        private readonly IBeperkingRepository beperkingRepository;

        public OnderzoekController(IOnderzoekRepository onderzoekRepository, IBedrijfRepository bedrijfRepository, IBeperkingRepository beperkingRepository)
        {
            this.onderzoekRepository = onderzoekRepository;
            this.bedrijfRepository = bedrijfRepository;
        }

        [HttpGet("onderzoeken")]
        public IActionResult GetOnderzoeken()
        {
            ICollection<Onderzoek> onderzoekLijst = onderzoekRepository.GetOnderzoeken(); 
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(onderzoekLijst);
        }

        [HttpPost("create-onderzoek")]
        public IActionResult CreateOnderzoek([FromBody] OnderzoekCreateModel onderzoek)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfById(onderzoek.bedrijfId);

            if (bedrijf == null)
                return BadRequest("Bedrijf bestaat niet");

            ICollection<OnderzoekBeperkingCriteria> beperkingCriteria = new List<OnderzoekBeperkingCriteria>();

            foreach (int beperkingId in onderzoek.beperkingCriteriaList)
            {
                Beperking? beperking = beperkingRepository.GetBeperkingById(beperkingId);

                if (beperking == null)
                    return BadRequest($"Beperking id {beperkingId} bestaat niet");

                beperkingCriteria.Add(new OnderzoekBeperkingCriteria { Beperking = beperking });
            }

            ICollection<OnderzoekLeeftijdCriteria> leeftijdCriteria = new List<OnderzoekLeeftijdCriteria>();

            foreach (int leeftijd in onderzoek.leeftijdCriteriaList)
            {
                leeftijdCriteria.Add(new OnderzoekLeeftijdCriteria { Leeftijd = leeftijd });
            }

            ICollection<OnderzoekPostcodeCriteria> postcodeCriteria = new List<OnderzoekPostcodeCriteria>();
            foreach (string postcode in onderzoek.postcodeCriteriaList)
            {
                postcodeCriteria.Add(new OnderzoekPostcodeCriteria { Postcode = postcode });
            }

            onderzoekRepository.CreateOnderzoek(onderzoek.titel, onderzoek.beschrijving, bedrijf, onderzoek.startDatum, onderzoek.eindDatum, onderzoek.locatie, beperkingCriteria, leeftijdCriteria, postcodeCriteria);
            return Ok(onderzoek);
        }
    }
}