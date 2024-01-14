using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekLeeftijdCriteria
    {
        [JsonIgnore]
        public int OnderzoekId { get; set; }
        [JsonIgnore]
        public Onderzoek Onderzoek { get; set; }
        public int MinLeeftijd { get; set; }
        public int MaxLeeftijd { get; set; }
    }
}
