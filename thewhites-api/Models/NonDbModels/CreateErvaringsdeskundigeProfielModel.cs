namespace AspTest.Models

{
    public class CreateErvaringsdeskundigeProfielModel
    {
        public string voornaam { get; set; }
        public string achternaam { get; set; }

        public DateTime geboortedatum{get; set;}
        public string postcode { get; set; }
        public string telefoonnummer { get; set; }
        public ICollection<int> beperkingTypes {get; set;}
        public string aandoening { get; set; }
        public string hulpmiddelen { get; set; }
        public ICollection<int> onderzoekTypes {get; set;}
        public bool portaalBenadering { get; set; }
        public bool telefonischBenadering { get; set; }
        public string beschikbaar { get; set; }
        public bool toestemmingUitnodigingen {get; set; }
    }
}