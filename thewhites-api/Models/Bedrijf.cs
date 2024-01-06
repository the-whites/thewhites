

using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class Bedrijf
    {
        public int Id { get; set; }
        public string Naam {get; set; }
        public string Beschrijving {get; set; }
        public string Link {get; set; }
        public string Locatie {get; set; }

        [JsonIgnore]
        public Gebruiker Gebruiker {get; set;}
        public int GebruikerId {get; set;}
        [JsonIgnore]
        public ICollection<Onderzoek> Onderzoeken { get; set; }
    }
}