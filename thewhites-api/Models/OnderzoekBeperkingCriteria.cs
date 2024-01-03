namespace AspTest.Models
{
    public class OnderzoekBeperkingCriteria
    {
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public int BeperkingId { get; set; }
        public Beperking Beperking { get; set; }
    }
}
