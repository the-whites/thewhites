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
                    //OnderzoekCategories = onderzoek.OnderzoekCategories,
                    //BeperkingCriteria = onderzoek.BeperkingCriteria,
                    //LeeftijdCriteria = onderzoek.LeeftijdCriteria, // (!) FIX : leeftijd wordt altijd leeg gegeven terwijl het in database correct is
                    //PostcodeCriteria = onderzoek.PostcodeCriteria,
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
        public async Task<IActionResult> CreateOnderzoek([FromBody] Onderzoek onderzoek)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(899, new { Message = "Validation error", Errors = ModelState.Values.SelectMany(v => v.Errors) });
                }

                await onderzoekRepository.CreateOnderzoek(onderzoek);
                return Ok(new { Message = "Onderzoek has been created." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Error creating Onderzoek: {ex.Message}" });
            }
        }
    }
}