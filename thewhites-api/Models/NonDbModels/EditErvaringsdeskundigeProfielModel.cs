namespace AspTest.Models
{
    public class EditErvaringsdeskundigeProfielModel
    {
        public string telefoonnummer { get; set; }
        public string hulpmiddelen { get; set; }
        public bool comBenadering {get; set; }
        public bool portaalBenadering {get; set; }
        public bool telefonischBenadering {get; set; }
        public string beschikbaarheid { get; set; }
        public string aandoeningZiekte {get; set;}
        public ICollection<int> beperkingTypes {get; set;}
        public ICollection<int> onderzoekTypes {get; set;}
    }
}