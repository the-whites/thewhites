namespace AspTest.Models
{
    public class OnderzoekLeeftijdCriteria
    {
        public int Id { get; set; }
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public int Leeftijd { get; set; }
    }
}
