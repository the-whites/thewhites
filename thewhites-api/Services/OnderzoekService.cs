


using AspTest.Models;
using AspTest.Util;

namespace AspTest.Services
{
    public static class OnderzoekService
    {
        public static bool IsErvaringsdeskundigeBinnenCriteria(Ervaringsdeskundige ervDeskundige, Onderzoek onderzoek, out string reden)
        {
            int leeftijd = GeneralUtils.GetLeeftijdFromGebDatum(ervDeskundige.Geboortedatum);
            bool isBinnenLeeftijdGroep = onderzoek.LeeftijdCriteria.Any((lc) => lc.MinLeeftijd <= leeftijd && leeftijd <= lc.MaxLeeftijd);

            // Check leeftijd
            if (onderzoek.LeeftijdCriteria.Count > 0 && !isBinnenLeeftijdGroep)
            {
                reden = "Buiten leeftijdscriteria.";
                return false;
            }
            else if (onderzoek.BeperkingCriteria.Count > 0 && !onderzoek.BeperkingCriteria.Any( (bc) => ervDeskundige.ErvaringsdeskundigeBeperkingen.Any((eb) => eb.Beperking == bc.Beperking) ))
            {
                reden = "Buiten beperkingcriteria.";
                return false;
            }
            else if (onderzoek.OnderzoekCategories.Count > 0 && !onderzoek.OnderzoekCategories.Any( (oc) => ervDeskundige.ErvaringsdeskundigeOnderzoekTypes.Any((eo) => eo.VoorkeurOnderzoekType == oc.Type) ))
            {
                reden = "Buiten onderzoekcriteria.";
                return false;
            }
            // Skip postcode voor nu.
            /*else if (!onderzoek.PostcodeCriteria.Any( (pc) => ervDeskundige.Postcode.Any((eo) => eo.VoorkeurOnderzoekType == oc.Type) ))
            {

            }*/

            reden = "";
            return true;
        }
    }
}