using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class Onderzoek
    {
        public int Id { get; set; }
        public string Titel {get; set; }
        public string Beschrijving {get; set; }
        
        [JsonIgnore]
        public int BedrijfId { get; set; }
        
        public Bedrijf Bedrijf { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public string Beloning { get; set; }
        public string Locatie {get;set;}
        public ICollection<OnderzoekCategories> OnderzoekCategories {get; set;}
        public ICollection<OnderzoekBeperkingCriteria> BeperkingCriteria {get; set;}
        public ICollection<OnderzoekLeeftijdCriteria> LeeftijdCriteria {get; set;}
        public ICollection<OnderzoekPostcodeCriteria> PostcodeCriteria {get; set;}
    }
}