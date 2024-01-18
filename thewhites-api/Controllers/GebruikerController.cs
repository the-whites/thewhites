using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GebruikerController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;
        private readonly INotificatieRepository _notificatieRepository;

        public GebruikerController(IGebruikerRepository gebruikerRepository, INotificatieRepository notificatieRepository)
        {
            _gebruikerRepository = gebruikerRepository;
            _notificatieRepository = notificatieRepository;
        }

        [HttpGet("gebruikers")]
        public IActionResult GetGebruikers()
        {
            ICollection<Gebruiker> gebruikerLijst = _gebruikerRepository.GetGebruikers();
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(gebruikerLijst);
        }

        [HttpGet("{gebruikerId}")]
        public IActionResult GetGebruikerIdUsingRoute([FromRoute(Name = "gebruikerId")] int id)
        {
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(id);
            
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

        [Authorize]
        [HttpGet("meldingen")]
        public IActionResult GetMeldingenFromGebruikerId()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);
            
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if(gebruiker == null)
            {
                return Unauthorized("Gebruiker bestaat niet");
            }

            ICollection<Notificatie> meldingen = _notificatieRepository.GetNotificatiesFromGebruiker(gebruiker);
                       
            return Ok(meldingen);
        }

        [Authorize]
        [HttpGet("meldingen/ongelezen-aantal")]
        public IActionResult GetUnreadMeldingenCount()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);
            
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if(gebruiker == null)
            {
                return Unauthorized("Gebruiker bestaat niet");
            }

            int meldingenCount = _notificatieRepository.GetUnreadNotificationsCount(gebruiker);
                       
            return Ok(meldingenCount);
        }

        [Authorize]
        [HttpPost("meldingen/markeer-als-gelezen/{meldingId}")]
        public IActionResult MarkMeldingAsRead(int meldingId)
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);
            
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if(gebruiker == null)
            {
                return Unauthorized("Gebruiker bestaat niet");
            }

            Notificatie? notificatie = _notificatieRepository.GetNotificatieById(meldingId);

            if(notificatie == null)
            {
                return BadRequest("Melding bestaat niet");
            }

            if(notificatie.Gebruiker != gebruiker)
            {
                return Unauthorized("Melding is niet van deze gebruiker");
            }

            _notificatieRepository.MarkNotificatieAsRead(notificatie);

            return Ok();
        }

    }
}