

using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class ErvaringsdeskundigeBeperking
    {
        public int ErvaringsdeskundigeId { get; set; }
  
        public int BeperkingId { get; set; }
        [JsonIgnore]
        public Beperking Beperking {get; set;}
        [JsonIgnore]
        public Ervaringsdeskundige Ervaringsdeskundige {get; set;}
    }
}