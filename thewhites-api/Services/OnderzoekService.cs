


using System.Security.Claims;
using AspTest.Models;
using AspTest.Repository;
using AspTest.Util;
using Microsoft.AspNetCore.Mvc;

namespace AspTest.Services
{
    public class OnderzoekService
    {
        private readonly IOnderzoekRepository onderzoekRepository;
        private readonly IBedrijfRepository bedrijfRepository;
        private readonly IBeperkingRepository beperkingRepository;
        private readonly IOnderzoekTypeRepository onderzoekTypeRepository;

        public OnderzoekService(
            IOnderzoekRepository onderzoekRepository, 
            IBedrijfRepository bedrijfRepository,
            IBeperkingRepository beperkingRepository,
            IOnderzoekTypeRepository onderzoekTypeRepository)
        {
            this.onderzoekRepository = onderzoekRepository;
            this.bedrijfRepository = bedrijfRepository;
            this.beperkingRepository = beperkingRepository;
            this.onderzoekTypeRepository = onderzoekTypeRepository;
        }
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

        public bool ValidateAndMapCriteriaLists(OnderzoekBodyModel onderzoek,
            out ICollection<OnderzoekCategories> onderzoekCategoriesList,
            out ICollection<OnderzoekPostcodeCriteria> onderzoekPostcodeCriteriaList,
            out ICollection<OnderzoekLeeftijdCriteria> onderzoekLeeftijdCriteriaList,
            out ICollection<OnderzoekBeperkingCriteria> onderzoekBeperkingCriteriaList,
            out string reden)
        {
            onderzoekCategoriesList = CriteriaListMapper.MapCriteriaList(onderzoek.categoriesList, categorieId =>
                new OnderzoekCategories { Type = onderzoekTypeRepository.GetOnderzoekTypeById(categorieId) });

            onderzoekPostcodeCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.postcodeCriteriaList, postcode =>
                new OnderzoekPostcodeCriteria { Postcode = postcode });

            onderzoekLeeftijdCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.leeftijdCriteria, leeftijd =>
                new OnderzoekLeeftijdCriteria { MinLeeftijd = leeftijd.MinLeeftijd, MaxLeeftijd = leeftijd.MaxLeeftijd });

            onderzoekBeperkingCriteriaList = CriteriaListMapper.MapCriteriaList(onderzoek.beperkingCriteriaList, beperking =>
                new OnderzoekBeperkingCriteria { Beperking = beperkingRepository.GetBeperkingById(beperking) });

            if (onderzoekCategoriesList.Any(oc => oc.Type == null))
            {
                reden = "Een of meerdere onderzoekcategorieën bestaan niet.";
                return false;
            }

            if (onderzoekBeperkingCriteriaList.Any(obc => obc.Beperking == null))
            {
                reden = "Een of meerdere beperkingen bestaan niet.";
                return false;
            }

            foreach (var leeftijdCriteria in onderzoekLeeftijdCriteriaList)
            {
                if (leeftijdCriteria.MinLeeftijd > leeftijdCriteria.MaxLeeftijd)
                {
                   reden = $"Min ({leeftijdCriteria.MinLeeftijd}) leeftijd is groter dan max leeftijd ({leeftijdCriteria.MaxLeeftijd})";
                   return false;
                }
            }

            reden = "";
            return true;
        }
        
        public Bedrijf? GetBedrijfByUserId(ClaimsPrincipal user)
        {
            Claim? userIdClaim = user.FindFirst("user_id");
            int.TryParse(userIdClaim?.Value, out int userId);
            return bedrijfRepository.GetBedrijfByUserId(userId);
        }
    }
}