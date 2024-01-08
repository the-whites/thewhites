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
    }
}