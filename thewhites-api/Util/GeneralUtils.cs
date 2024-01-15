using System.Text.RegularExpressions;

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
    }
}