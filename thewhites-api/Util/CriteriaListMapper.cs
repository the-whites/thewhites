using AspTest.Data;
using AspTest.Models;

namespace AspTest.Util
{
    public static class CriteriaListMapper
    {
        public static List<T> MapCriteriaList<T, U>(List<U> sourceList, Func<U, T> mappingFunction)
        {
            return sourceList?.Select(mappingFunction).ToList() ?? new List<T>();
        }
    }
}