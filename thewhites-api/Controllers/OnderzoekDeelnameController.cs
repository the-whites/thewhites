using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekDeelname : Controller
    {
        private readonly IOnderzoekDeelnameRepository onderzoekDeelnameRepository;

        public OnderzoekDeelname(OnderzoekDeelnameRepository onderzoekDeelnameRepository)
        {
            this.onderzoekDeelnameRepository = onderzoekDeelnameRepository;
        }

        [HttpGet("onderzoek-types")]
        public IActionResult GetTotalOnderzoekDeelnemers([FromBody] int onderzoekId)
        {
            ICollection<OnderzoekType> onderzoekTypeLijst = null;//onderzoekTypeRepository.GetOnderzoekTypes(); 
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(onderzoekTypeLijst);
        }
    }
}