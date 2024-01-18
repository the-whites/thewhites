using AspTest.Models;

namespace AspTest.Repository
{
    public class NotificatieRepository : INotificatieRepository
    {
        private readonly AspDbContext _context;

        public NotificatieRepository(AspDbContext context)
        {
            _context = context;
        }

        public ICollection<Notificatie> GetNotificatiesFromGebruiker(Gebruiker gebruiker)
        {
            return _context.Notificaties
                .Where(n => n.Gebruiker == gebruiker)
                .ToList();
        }

        public Task MarkNotificatieAsRead(Notificatie notificatie)
        {
            notificatie.status = true;

            return _context.SaveChangesAsync();
        }

        public Notificatie? GetNotificatieById(int notificatieId)
        {
            return _context.Notificaties
                .Find(notificatieId);
        }

        public int GetUnreadNotificationsCount(Gebruiker gebruiker)
        {
            return _context.Notificaties
                .Where(n => n.Gebruiker == gebruiker && n.status == false)
                .Count();
        }
    }
}