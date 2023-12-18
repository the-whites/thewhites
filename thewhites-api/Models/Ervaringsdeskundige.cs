

namespace AspTest.Models
{
    public class Ervaringsdeskundige
    {
        public int Id { get; set; }
        public string Postcode {get; set; }
        public string Telefoonnummer {get; set; }

        public Gebruiker Gebruiker {get;set;}

        public int GebruikerId {get; set;}

        public ICollection<ErvaringsdeskundigeBeperking> ErvaringsdeskundigeBeperkingen {get; set;}

    }
}