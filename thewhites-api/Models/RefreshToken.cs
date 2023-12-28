namespace AspTest.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public Gebruiker Gebruiker { get; set; }
        public string Token { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime Expires { get; set; }
    }
}