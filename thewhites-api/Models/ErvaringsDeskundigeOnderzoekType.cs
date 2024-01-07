

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class ErvaringsdeskundigeOnderzoekType
    {
        public int ErvaringsdeskundigeId { get; set; }
        public int OnderzoekTypeId {get; set;}

        [ForeignKey("ErvaringsdeskundigeId")]
        [JsonIgnore]
        public Ervaringsdeskundige Ervaringsdeskundige { get; set; }
        [ForeignKey("OnderzoekTypeId")]
        [JsonIgnore]
        public OnderzoekType VoorkeurOnderzoekType {get; set; }


    }
}