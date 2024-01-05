using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekCategories
    {
        [JsonIgnore]
        public int OnderzoekId { get; set; }
        [JsonIgnore]
        public Onderzoek Onderzoek { get; set; }
        [JsonIgnore]
        public int TypeId { get; set; }
        public OnderzoekType Type { get; set; }
    }
}