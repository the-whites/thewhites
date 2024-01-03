using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekBeperkingCriteria
    {
        [JsonIgnore]
        public int OnderzoekId { get; set; }
        [JsonIgnore]
        public Onderzoek Onderzoek { get; set; }
        [JsonIgnore]
        public int BeperkingId { get; set; }
        public Beperking Beperking { get; set; }
    }
}
 