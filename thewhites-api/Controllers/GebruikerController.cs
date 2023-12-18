using AspTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GebruikerController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;

        public GebruikerController(IGebruikerRepository gebruikerRepository)
        {
            _gebruikerRepository = gebruikerRepository;
        }

        [HttpGet("{gebruikerId}")]
        public IActionResult GetGebruikerIdUsingRoute([FromRoute(Name = "gebruikerId")] int id)
        {
            Gebruiker gebruiker = _gebruikerRepository.GetGebruiker(id);
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            if (gebruiker == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(gebruiker);
            }
        }
    }
}