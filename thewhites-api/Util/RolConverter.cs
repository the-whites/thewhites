
using AspTest.Data;

namespace AspTest.Util
{
    public static class RolConverter
    {
        public static string? ConvertToDb(Rollen rol)
        {
            switch (rol)
            {
                case Rollen.ERVARINGSDESKUNDIGE: return "ervaringsdeskundige";
                case Rollen.BEDRIJF: return "bedrijf";
                case Rollen.BEHEERDER: return "beheerder";
            }

            return null;
        }

        public static Rollen? ConvertToEnum(string dbRolValue)
        {
            switch (dbRolValue)
            {
                case "ervaringsdeskundige": return Rollen.ERVARINGSDESKUNDIGE;
                case "bedrijf": return Rollen.BEDRIJF;
                case "beheerder": return Rollen.BEHEERDER;
            }

            return null;
        }
    }
}