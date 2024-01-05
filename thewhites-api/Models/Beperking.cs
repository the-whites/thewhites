

using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class Beperking
    {
        public int Id { get; set; }
        public string Naam {get; set; }
        public string Omschrijving {get; set; }

        [JsonIgnore]
        public ICollection<ErvaringsdeskundigeBeperking> ErvaringsdeskundigeBeperkingen {get; set;}
        [JsonIgnore]
        public ICollection<OnderzoekBeperkingCriteria> OnderzoekBeperkingCriterias { get; set; }
    }
}