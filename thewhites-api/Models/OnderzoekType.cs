using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class OnderzoekType
    {
        public int Id { get; set; }
        public string Type {get; set; }
        public string Beschrijving {get; set; }

        [JsonIgnore]
        public ICollection<OnderzoekCategories> OnderzoekCategories {get; set;}
    }
}