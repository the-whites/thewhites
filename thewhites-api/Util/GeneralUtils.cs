using System.Text.RegularExpressions;
using AspTest.Models;

namespace AspTest.Util
{
    public static class GeneralUtils
    {
        public static bool IsNumeric(string input)
        {
            Regex regex = new Regex("^[0-9]+$");
            return regex.IsMatch(input);
        }

        public static int GetLeeftijdFromGebDatum(DateTime gebDatum)
        {
            int age = DateTime.Now.Year - gebDatum.Year;

            if (DateTime.Now.DayOfYear < gebDatum.DayOfYear)
                age = age - 1;

            return age;
        }

        public static string GetFullNaamFromGebruiker(Gebruiker gebruiker){
        return gebruiker.Voornaam + " " + gebruiker.Achternaam;
        }
    }
}