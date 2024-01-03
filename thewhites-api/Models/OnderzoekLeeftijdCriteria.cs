using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekLeeftijdCriteria
    {
        [JsonIgnore]
        public int OnderzoekId { get; set; }
        [JsonIgnore]
        public Onderzoek Onderzoek { get; set; }
        [JsonIgnore]
        public int Leeftijd { get; set; }
    }
}
