namespace AspTest.Models
{
    public class OnderzoekCategories
    {
        public int Id { get; set; }
        public int OnderzoekId { get; set; }
        public Onderzoek Onderzoek { get; set; }
        public int TypeId { get; set; }
        public OnderzoekType Type { get; set; }
    }
}