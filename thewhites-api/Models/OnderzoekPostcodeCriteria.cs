using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekPostcodeCriteria
    {
        [JsonIgnore]
        public int OnderzoekId { get; set; }
        [JsonIgnore]
        public Onderzoek Onderzoek { get; set; }
        public string Postcode { get; set; }
    }
}
