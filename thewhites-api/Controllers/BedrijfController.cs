using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BedrijfController : Controller
    {
        private readonly IBedrijfRepository bedrijfRepository;
        private readonly IOnderzoekRepository onderzoekRepository;

        public BedrijfController(IBedrijfRepository bedrijfRepository, IOnderzoekRepository onderzoekRepository)
        {
            this.bedrijfRepository = bedrijfRepository;
            this.onderzoekRepository = onderzoekRepository;
        }

        [Authorize]
        [HttpGet("mijn-onderzoeken")]
        public IActionResult GetBedrijfOnderzoeken()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfByUserId(userId);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            ICollection<Onderzoek> onderzoekLijst = onderzoekRepository.GetOnderzoekenByBedrijf(bedrijf); 

            return Ok(onderzoekLijst);
        }

        [Authorize]
        [HttpGet("mijn-onderzoeken/{onderzoekId}")]
        public IActionResult GetBedrijfOnderzoekById(int onderzoekId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); 

            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);

            Bedrijf? bedrijf = bedrijfRepository.GetBedrijfByUserId(userId);

            if(bedrijf == null)
            {
                return Unauthorized("Gebruiker heeft geen bedrijf");
            }

            Onderzoek? onderzoek = onderzoekRepository.GetOnderzoekByOnderzoekId(onderzoekId);

            if(onderzoek == null || onderzoek.Bedrijf != bedrijf)
            {
                return Unauthorized("Gebruiker heeft geen toegang naar dit onderzoek");
            }
            
            return Ok(onderzoek);
        }
    }
}