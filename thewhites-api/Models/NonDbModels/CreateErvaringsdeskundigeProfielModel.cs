namespace AspTest.Models

{
    public class CreateErvaringsdeskundigeProfielModel
    {
        public string Voornaam { get; set; }
        public string Achternaam { get; set; }
        public string Postcode { get; set; }
        public string Emailadres { get; set; }
        public string Telefoonnummer { get; set; }
        public ICollection<int> beperkingTypes {get; set;}
        public string Aandoening { get; set; }
        public string Hulpmiddelen { get; set; }
        public ICollection<int> onderzoekTypes {get; set;}
        public bool PortaalBenadering { get; set; }
        public bool TelefonischBenadering { get; set; }
        public string Beschikbaar { get; set; }
        public bool comBenadering {get; set; }
    }
}