using System;

namespace AspTest.Config 
{
    public class BaseCustomException : Exception
    {
        public DateTime Timestamp { get; }

        // Constructors
        public BaseCustomException()
        {
            Timestamp = DateTime.UtcNow;
        }

        public BaseCustomException(string message) : base(message)
        {
            Timestamp = DateTime.UtcNow;
        }

        public BaseCustomException(string message, Exception innerException) : base(message, innerException)
        {
            Timestamp = DateTime.UtcNow;
        }
    }

    public class InvalidOnderzoekTypesGivenException : BaseCustomException 
    { 
        public InvalidOnderzoekTypesGivenException(string message) : base(message) { }
    }

    public class InvalidBeperkingTypesGivenException : BaseCustomException 
    { 
        public InvalidBeperkingTypesGivenException(string message) : base(message) { }
    }

    public class InvalidOnderzoekException : BaseCustomException 
    { 
        public InvalidOnderzoekException(string message) : base(message) { }
    }
}