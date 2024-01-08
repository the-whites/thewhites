using System;

namespace AspTest.Config 
{
    public class InvalidOnderzoekTypesGivenException : Exception
    {
        // Custom properties or fields
        public DateTime Timestamp { get; }

        // Constructors
        public InvalidOnderzoekTypesGivenException()
        {
            Timestamp = DateTime.UtcNow;
        }

        public InvalidOnderzoekTypesGivenException(string message) : base(message)
        {
            Timestamp = DateTime.UtcNow;
        }

        public InvalidOnderzoekTypesGivenException(string message, Exception innerException) : base(message, innerException)
        {
            Timestamp = DateTime.UtcNow;
        }
    }

    public class InvalidBeperkingTypesGivenException : Exception
    {
        // Custom properties or fields
        public DateTime Timestamp { get; }

        // Constructors
        public InvalidBeperkingTypesGivenException()
        {
            Timestamp = DateTime.UtcNow;
        }

        public InvalidBeperkingTypesGivenException(string message) : base(message)
        {
            Timestamp = DateTime.UtcNow;
        }

        public InvalidBeperkingTypesGivenException(string message, Exception innerException) : base(message, innerException)
        {
            Timestamp = DateTime.UtcNow;
        }
    }
}