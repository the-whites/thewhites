

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AspTest.Models
{
    public class Chat
    {
        public int Id { get; set; }
        
        public int GebruikerAfzenderId { get; set; }
        public Gebruiker GebruikerAfzender { get; set; }

        public int GebruikerOntvangerId { get; set; }
        public Gebruiker GebruikerOntvanger { get; set; }


        public string Inhoud { get; set; }
        public DateTime Datum { get; set; }

    }
}