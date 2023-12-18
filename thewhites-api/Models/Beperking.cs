

namespace AspTest.Models
{
    public class Beperking
    {
        public int Id { get; set; }
        public string Naam {get; set; }
        public string Omschrijving {get; set; }


        public ICollection<ErvaringsdeskundigeBeperking> ErvaringsdeskundigeBeperkingen {get; set;}
    }
}