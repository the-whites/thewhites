namespace AspTest.Models
{
    public class OnderzoekBodyModel
    {
        public string titel { get; set; }
        public string beschrijving { get; set; }
        public DateTime startDatum { get; set; }
        public DateTime eindDatum { get; set; }
        public string beloning { get; set; }
        public string locatie { get; set;}
        public List<string> postcodeCriteriaList { get; set; }
        public List<int> leeftijdCriteriaList { get; set; }
        public List<int> beperkingCriteriaList { get; set; }
        public List<int> categoriesList { get; set; }
    }
}