using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AspTest.Models
{
    public class Onderzoek
    {
        public int Id { get; set; }
        public string Titel {get; set; }
        public string Beschrijving {get; set; }
        
        public int BedrijfId { get; set; }
        
        public Bedrijf Bedrijf { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public string Beloning { get; set; }
        public string Locatie {get;set;}
        public ICollection<OnderzoekCategories> OnderzoekCategories {get; set;}
        public ICollection<OnderzoekBeperkingCriteria> BeperkingCriteria {get; set;}
        // Kan dit geen <int> en <string> zijn? aangezien er niks anders gebonden is aan postcodes en leeftijden anders dan de values zelf?
        public ICollection<OnderzoekLeeftijdCriteria> LeeftijdCriteria {get; set;}
        public ICollection<OnderzoekPostcodeCriteria> PostcodeCriteria {get; set;}

        [JsonIgnore]
        public ICollection<OnderzoekDeelname> OnderzoekDeelname {get; set;}
    }
}