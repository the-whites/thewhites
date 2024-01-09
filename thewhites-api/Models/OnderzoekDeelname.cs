using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekDeelname
    {
        [JsonIgnore]
        public int ErvaringsdeskundigeId { get; set; }
        public Ervaringsdeskundige Ervaringsdeskundige { get; set; }

        [JsonIgnore]
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public bool status { get; set;}
    }
}
