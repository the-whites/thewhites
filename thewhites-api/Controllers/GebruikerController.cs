using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GebruikerController : Controller
    {
        private readonly IGebruikerRepository _gebruikerRepository;
        private readonly INotificatieRepository _notificatieRepository;
        private readonly IErvaringsdeskundigeRepository _ervaringsdeskundigeRepository;
        private readonly IBedrijfRepository _bedrijfRepository;
        private readonly AspDbContext _context;

        public GebruikerController(
            IGebruikerRepository gebruikerRepository, 
            INotificatieRepository notificatieRepository,
            IErvaringsdeskundigeRepository ervaringsdeskundigeRepository,
            AspDbContext context,
            IBedrijfRepository bedrijfRepository)
        {
            _gebruikerRepository = gebruikerRepository;
            _notificatieRepository = notificatieRepository;
            _context = context;
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

        [Authorize]
        [HttpPost("verwijder-account")]
        public IActionResult DeleteAccount()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");

            int.TryParse(UserIdClaim!.Value, out int userId);
            
            Gebruiker? gebruiker = _gebruikerRepository.GetGebruikerById(userId);

            if(gebruiker == null)
            {
                return Unauthorized("Gebruiker bestaat niet");
            }

            Response.Cookies.Delete("refresh_token");
            _gebruikerRepository.DeleteGebruiker(gebruiker);
            return Ok();
        }
        
        // Niet de messages meesturen, anders kan dit op lange termijn slecht verlopen.
        [Authorize]
        [HttpGet("chats")]
        public IActionResult GetChats()
        {
            Claim? UserIdClaim = User.FindFirst("user_id");
            int.TryParse(UserIdClaim!.Value, out int userId);

            Gebruiker? gebruiker = _gebruikerRepository
                .GetGebruikersWithQueryable()
                .FirstOrDefault(g4 => g4.Id == userId);

            if(gebruiker == null)
                return NotFound("Gebruiker bestaat niet.");


            var chatPartners = _context.Chats
                .Include(c => c.GebruikerOntvanger)
                .Include(c => c.GebruikerAfzender)
                .Where(chat => chat.GebruikerOntvanger.Id == userId || chat.GebruikerAfzender.Id == userId)
                .Select(chat => 
                    chat.GebruikerOntvanger.Id == userId 
                    ? new { id = chat.GebruikerAfzender.Id, naam = chat.GebruikerAfzender.Voornaam + " " + chat.GebruikerAfzender.Achternaam}
                    : new { id = chat.GebruikerOntvanger.Id, naam = chat.GebruikerOntvanger.Voornaam + " " + chat.GebruikerOntvanger.Achternaam}
                )
                .ToList()
                .DistinctBy(chat => chat.id);
          
            return Ok(chatPartners);
        }

        [Authorize]
        [HttpGet("chats/{receiverId}")]
        public IActionResult GetChats([FromRoute] int receiverId )
        {
            Claim? UserIdClaim = User.FindFirst("user_id");
            int.TryParse(UserIdClaim!.Value, out int userId);

            Gebruiker? gebruiker = _gebruikerRepository
                .GetGebruikersWithQueryable()
                .FirstOrDefault(g4 => g4.Id == userId);

            if(gebruiker == null)
                return NotFound("Gebruiker bestaat niet.");
                
            var receiver = _gebruikerRepository.GetGebruikerById(receiverId);

            if (receiver == null)
                return NotFound("ontvanger was niet te vinden.");

            var messages = _context.Chats
                .Include(c => c.GebruikerOntvanger)
                .Include(c => c.GebruikerAfzender)
                .Where(chat => 
                (chat.GebruikerOntvanger.Id == receiverId && chat.GebruikerAfzender.Id == userId) 
                || (chat.GebruikerOntvanger.Id == userId && chat.GebruikerAfzender.Id == receiverId) 
            ).Select(message => new {
                id = message.Id,
                fromId = message.GebruikerAfzender.Id, 
                toId = message.GebruikerOntvanger.Id, 
                message = message.Inhoud
            });

            string naam = receiver.Voornaam + " " + receiver.Achternaam;
          
            return Ok(new {toNaam = naam, messages});
        }

        [Authorize]
        [HttpPost("chat/{receiverId}")]
        public async Task<IActionResult> SendChat(ChatMessageModel model, [FromRoute] int receiverId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Claim? UserIdClaim = User.FindFirst("user_id");
            int.TryParse(UserIdClaim!.Value, out int userId);

            Gebruiker? gebruiker = _gebruikerRepository
                .GetGebruikersWithQueryable()
                .Include(g => g.Bedrijf)
                .FirstOrDefault(g4 => g4.Id == userId);

            if(gebruiker == null)
                return NotFound("Gebruiker bestaat niet.");
            
            Gebruiker? receiver = _gebruikerRepository
                .GetGebruikersWithQueryable()
                .Include(g => g.Bedrijf)
                    .ThenInclude(b => b.Onderzoeken)
                        .ThenInclude(o => o.OnderzoekDeelname)
                .FirstOrDefault(g4 => g4.Id == receiverId);

            if (receiver == null)
                return NotFound("ontvanger was niet te vinden.");


            // Zodat gebruikers (ervaringsdeskundigen) geen berichten naar ongewenste gebruikers kunnen sturen, maar alleen bedrijven.
            /*if (receiver.Bedrijf == null && gebruiker.Bedrijf == null)
                return Unauthorized("Kan geen berichten sturen naar deze gebruiker.");*/

            // TODO
            /*if (receiver.Bedrijf != null && 
                    receiver.Bedrijf.Onderzoeken.Any(
                        onderzoek => onderzoek.EindDatum > DateTime.Now // Onderzoek moet niet gestopt zijn.
                        && !onderzoek.OnderzoekDeelname.Any(d => d.Ervaringsdeskundige.Gebruiker.Id == userId && d.OnderzoekId == onderzoek.Id) // Gebruiker moet deelgenomen hebben aan dit onderzoek.
                    )
            )
            {
                return Unauthorized("Je hebt geen deelname aan een onderzoek van dit bedrijf.");
            }*/

            if (model.message.Length == 0)
                return BadRequest("Chat is te klein.");
            
            // Repository - SendChat

            var chat = new Chat();
            chat.Datum = DateTime.Now;
            chat.GebruikerAfzender = gebruiker;
            chat.GebruikerOntvanger = receiver;
            chat.Inhoud = model.message;

            _context.Chats.Add(chat);

            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}