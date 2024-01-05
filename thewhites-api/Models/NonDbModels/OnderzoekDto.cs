namespace AspTest.Models
{
    public class OnderzoekDto
    {
        public string titel { get; set; }
        public string beschrijving { get; set; }
        public string locatie { get; set;}
        public string beloning { get; set; }
        public DateTime startDatum { get; set; }
        public DateTime eindDatum { get; set; }
        public BedrijfDto bedrijf { get; set;}
        public ICollection<OnderzoekCategories> OnderzoekCategories {get; set;}
        public ICollection<OnderzoekBeperkingCriteria> BeperkingCriteria {get; set;}
        public ICollection<OnderzoekLeeftijdCriteria> LeeftijdCriteria {get; set;}
        public ICollection<OnderzoekPostcodeCriteria> PostcodeCriteria {get; set;}
    }
}