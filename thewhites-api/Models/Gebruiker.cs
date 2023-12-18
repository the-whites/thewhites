

namespace AspTest.Models
{
    public class Gebruiker
    {
        public int Id { get; set; }
        public string Voornaam {get; set; }
        public string Achternaam {get; set; }
        public string Emailadres { get; set; }
        public string Rol { get; set; }

        public Ervaringsdeskundige? Ervaringsdeskundige {get; set;}
        public Bedrijf? Bedrijf {get; set;}

        public ICollection<Notificatie> Notificaties {get; set;}
    }
}