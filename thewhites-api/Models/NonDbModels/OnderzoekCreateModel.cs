namespace AspTest.Models
{
    public class OnderzoekCreateModel
    {
        public string titel { get; set; }
        public string beschrijving { get; set; }
        public DateTime startDatum { get; set; }
        public DateTime eindDatum { get; set; }
        public int bedrijfId { get; set; }
        public string beloning { get; set; }
        public string locatie { get; set;}
        public ICollection<string> postcodeCriteriaList { get; set; }
        public ICollection<int> leeftijdCriteriaList { get; set; }
        public ICollection<int> beperkingCriteriaList { get; set; }
    }
}