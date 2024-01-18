using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class Notificatie
    {
        public int Id { get; set; }
        public string Tekst {get; set; }
        public bool status {get; set; }
        public DateTime datum { get; set; }
        [JsonIgnore]
        public Gebruiker Gebruiker {get;set;}
    }
}