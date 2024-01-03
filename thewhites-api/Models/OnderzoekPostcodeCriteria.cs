namespace AspTest.Models
{
    public class OnderzoekPostcodeCriteria
    {
        public int Id { get; set; }
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public string Postcode { get; set; }
    }
}
