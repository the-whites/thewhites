using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekDeelname
    {
        public int ErvaringsdeskundigeId { get; set; }
        public Ervaringsdeskundige Ervaringsdeskundige { get; set; } // evaringsdeskundige wordt niet correct gezet, id wel

        [JsonIgnore]
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public bool status { get; set;}
    }
}
