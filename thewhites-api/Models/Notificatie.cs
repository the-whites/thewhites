

namespace AspTest.Models
{
    public class Notificatie
    {
        public int Id { get; set; }
        public string Titel { get; set; }
        public string Tekst {get; set; }
        public bool status {get; set; }
        public DateTime datum { get; set; }
        public Gebruiker Gebruiker {get;set;}
    }
}