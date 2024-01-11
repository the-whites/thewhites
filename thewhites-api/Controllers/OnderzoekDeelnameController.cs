using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekDeelname : Controller
    {
        private readonly IOnderzoekDeelnameRepository onderzoekDeelnameRepository;
        private readonly IOnderzoekRepository onderzoekRepository;

        public OnderzoekDeelname(IOnderzoekDeelnameRepository onderzoekDeelnameRepository, IOnderzoekRepository onderzoekRepository)
        {
            this.onderzoekDeelnameRepository = onderzoekDeelnameRepository;
            this.onderzoekRepository = onderzoekRepository;
        }

        [HttpGet("deelnemers/{onderzoekId}")]
        public IActionResult GetOnderzoekDeelnemers(int onderzoekId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Onderzoek? onderzoek = onderzoekRepository.GetOnderzoekByOnderzoekId(onderzoekId);

            if(onderzoek == null)
            {
                return NotFound("Onderzoek niet gevonden");
            }

            var onderzoekDeelnemers = onderzoekDeelnameRepository.GetOnderzoekDeelnemers(onderzoek);

            if(onderzoekDeelnemers == null)
            {
                return NotFound("Geen deelnemers gevonden");
            }
            return Ok(onderzoekDeelnemers);
        }
    }
}