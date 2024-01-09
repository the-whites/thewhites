

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class ErvaringsdeskundigeBenaderingVoorkeur
    {
        public int Id { get; set; }

        [ForeignKey("ErvaringsdeskunidgeId")]
        [JsonIgnore]
        public Ervaringsdeskundige Ervaringsdeskundige { get; set; }
        public bool Telefonisch {get; set; }

        public bool Portaal {get;set;}
        public bool ToestemmingUitnodigingen { get; set; }

    }
}