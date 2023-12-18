

namespace AspTest.Models
{
    public class ErvaringsdeskundigeBeperking
    {
        public int ErvaringsdeskundigeId { get; set; }
  
        public int BeperkingId { get; set; }

        public Beperking Beperking {get; set;}

        public Ervaringsdeskundige Ervaringsdeskundige {get; set;}
    }
}