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
            ICollection<Onderzoek> onderzoekLijst = onderzoekRepository.GetOnderzoeken(); 
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var onderzoekDtoList = new List<OnderzoekDto>();

            // Automapper gebruiken?
            foreach (var onderzoek in onderzoekLijst)
            {
                var onderzoekDto = new OnderzoekDto
                {
                    titel = onderzoek.Titel,
                    beschrijving = onderzoek.Beschrijving,
                    locatie = onderzoek.Locatie,
                    beloning = onderzoek.Beloning,
                    startDatum = onderzoek.StartDatum,
                    eindDatum = onderzoek.EindDatum,
                    OnderzoekCategories = onderzoek.OnderzoekCategories,
                    BeperkingCriteria = onderzoek.BeperkingCriteria,
                    LeeftijdCriteria = onderzoek.LeeftijdCriteria,
                    PostcodeCriteria = onderzoek.PostcodeCriteria,
                    bedrijf = new BedrijfDto
                    {
                        Id = onderzoek.Bedrijf.Id,
                        Naam = onderzoek.Bedrijf.Naam,
                        Beschrijving = onderzoek.Bedrijf.Beschrijving,
                        Link = onderzoek.Bedrijf.Link,
                        Locatie = onderzoek.Bedrijf.Locatie
                    },
                };

                onderzoekDtoList.Add(onderzoekDto);
            }

            return Ok(onderzoekDtoList);
        }

        [HttpPost("create-onderzoek")]
        public async Task<IActionResult> CreateOnderzoek([FromBody] OnderzoekCreateModel onderzoek)
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

            ICollection<OnderzoekCategories> onderzoekCategories = new List<OnderzoekCategories>();
            foreach (int typeId in onderzoek.categoriesList)
            {
                OnderzoekType? onderzoekType = onderzoekTypeRepository.GetOnderzoekTypeById(typeId);

                if (onderzoekType == null)
                    return BadRequest($"Onderzoek type id {typeId} bestaat niet");

                onderzoekCategories.Add(new OnderzoekCategories { Type = onderzoekType });
            }

            var createdOnderzoek = await onderzoekRepository.CreateOnderzoek(onderzoek.titel, onderzoek.beschrijving, bedrijf, onderzoek.startDatum, onderzoek.eindDatum, onderzoek.locatie, onderzoek.beloning, beperkingCriteria, leeftijdCriteria, postcodeCriteria, onderzoekCategories);
            return Ok(createdOnderzoek);
        }
    }
}