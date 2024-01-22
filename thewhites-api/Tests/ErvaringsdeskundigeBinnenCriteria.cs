using AspTest.Models;
using AspTest.Services;
using Xunit;

namespace AspTest.Test
{
    public class ErvaringsdeskundigeBinnenCriteriaTests
    {
        private OnderzoekType CreateTestOnderzoekType(string type)
        {
            return new OnderzoekType
            {
                Id = 2,
                Type = type
            };
        }

        private Beperking CreateTestBeperking(string naam)
        {
            return new Beperking
            {
                Id = 3,
                Naam = naam
            };
        }

        private Ervaringsdeskundige CreateTestErvaringsdeskundige(
            OnderzoekType onderzoekType, 
            Beperking? beperking)
        {
            return new Ervaringsdeskundige
            {
                ErvaringsdeskundigeOnderzoekTypes = new List<ErvaringsdeskundigeOnderzoekType>
                {
                    new ErvaringsdeskundigeOnderzoekType
                    {
                        VoorkeurOnderzoekType = onderzoekType
                    }
                },
                ErvaringsdeskundigeBeperkingen = new List<ErvaringsdeskundigeBeperking>
                {
                    new ErvaringsdeskundigeBeperking
                    {
                        Beperking = beperking
                    }
                }
            };
        }

        private Onderzoek CreateTestOnderzoek(
            OnderzoekType onderzoekType, 
            List<OnderzoekBeperkingCriteria> beperkingCriteria)
        {
            return new Onderzoek
            {
                Id = 10,
                OnderzoekCategories = new List<OnderzoekCategories>
                {
                    new OnderzoekCategories
                    {
                        Type = onderzoekType
                    }
                },
                LeeftijdCriteria = new List<OnderzoekLeeftijdCriteria>(),
                BeperkingCriteria = beperkingCriteria
            };
        }

        [Fact]
        public void TestIsBinnenLeeftijdCriteria_IsErvaringsdeskundigeBinnenCriteria_IsTrueOnderzoek()
        {
            // Arrange
            OnderzoekType testOnderzoekType = CreateTestOnderzoekType("online");
            Ervaringsdeskundige testErvaringsdeskundige = CreateTestErvaringsdeskundige(testOnderzoekType, null);
            Onderzoek testOnderzoek = CreateTestOnderzoek(testOnderzoekType, new List<OnderzoekBeperkingCriteria>());

            // Act
            bool result = OnderzoekService.IsErvaringsdeskundigeBinnenCriteria(testErvaringsdeskundige, testOnderzoek, out string reden);

            // Assert
            Assert.True(result);
            Assert.Empty(reden);
        }

        [Fact]
        public void TestIsBinnenLeeftijdCriteria_IsErvaringsdeskundigeBinnenCriteria_IsTrueBeperking()
        {
            // Arrange
            OnderzoekType testOnderzoekType = CreateTestOnderzoekType("online");
            Beperking testBeperking = CreateTestBeperking("Visuele beperking");
            Ervaringsdeskundige testErvaringsdeskundige = CreateTestErvaringsdeskundige(testOnderzoekType, testBeperking);
            Onderzoek testOnderzoek = CreateTestOnderzoek(testOnderzoekType, new List<OnderzoekBeperkingCriteria>());

            // Act
            bool result = OnderzoekService.IsErvaringsdeskundigeBinnenCriteria(testErvaringsdeskundige, testOnderzoek, out string reden);

            // Assert
            Assert.True(result);
            Assert.Empty(reden);
        }

        [Fact]
        public void TestIsBinnenLeeftijdCriteria_IsErvaringsdeskundigeBinnenCriteria_IsFalseOnderzoekEnBeperking()
        {
            // Arrange
            OnderzoekType testOnderzoekType = CreateTestOnderzoekType("online");
            Beperking testBeperking = CreateTestBeperking("Visuele beperking");
            Beperking testBeperkingTwee = CreateTestBeperking("Gehoor beperking");
            Ervaringsdeskundige testErvaringsdeskundige = CreateTestErvaringsdeskundige(testOnderzoekType, testBeperking);
            Onderzoek testOnderzoek = CreateTestOnderzoek(testOnderzoekType, 
                new List<OnderzoekBeperkingCriteria>
                {
                    new OnderzoekBeperkingCriteria
                    {
                        Beperking = testBeperkingTwee
                    }
                });

            // Act
            bool result = OnderzoekService.IsErvaringsdeskundigeBinnenCriteria(testErvaringsdeskundige, testOnderzoek, out string reden);

            // Assert
            Assert.False(result);
            Assert.NotEmpty(reden);
            Assert.Contains("Buiten beperkingcriteria.", reden);
        }
    }
}