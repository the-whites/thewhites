using AspTest.Models;

namespace AspTest.Repository
{
    public interface INotificatieRepository
    {
        ICollection<Notificatie> GetNotificatiesFromGebruiker(Gebruiker gebruiker);
        Task MarkNotificatieAsRead(Notificatie notificatie);
        Notificatie? GetNotificatieById(int notificatieId);
        int GetUnreadNotificationsCount(Gebruiker gebruiker);
    }
}