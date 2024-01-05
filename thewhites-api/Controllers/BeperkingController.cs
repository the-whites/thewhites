using AspTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeperkingController : Controller
    {
        private readonly IBeperkingRepository beperkingRepository;

        public BeperkingController(IBeperkingRepository beperkingRepository)
        {
            this.beperkingRepository = beperkingRepository;
        }

        [HttpGet("beperkingen")]
        public IActionResult GetBeperkingen()
        {
            ICollection<Beperking> beperkingLijst = beperkingRepository.GetBeperkingen(); 
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(beperkingLijst);
        }
    }
}