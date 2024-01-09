using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekTypeController : Controller
    {
        private readonly IOnderzoekTypeRepository onderzoekTypeRepository;

        public OnderzoekTypeController(IOnderzoekTypeRepository onderzoekTypeRepository)
        {
            this.onderzoekTypeRepository = onderzoekTypeRepository;
        }

        [HttpGet("onderzoek-types")]
        public IActionResult GetOnderzoekTypes()
        {
            ICollection<OnderzoekType> onderzoekTypeLijst = onderzoekTypeRepository.GetOnderzoekTypes(); 
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(onderzoekTypeLijst);
        }
    }
}