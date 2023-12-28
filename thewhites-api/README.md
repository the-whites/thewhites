# The Whites - Backend service

### Belangrijke informatie

Zorg dat je .env file correct is (kopieer alles behalve de stukjes tussen <-- -->):

```
PORT=8066
ASPNETCORE_ENVIRONMENT=Development
MSSQL_CON_PORT=1433
MSSQL_CON_DB=thewhites_prod
MSSQL_CON_USER=sa
MSSQL_CON_PASS=PASS_HIER  <-- vraag richano -->
MSSQL_CON_HOST=HOST_HIER  <-- meestal db.dewhites.nl -->
<-- https://www.youtube.com/watch?v=r3tytnzCuNw&t=415s > stukje van 'Starting with Google Authentication' -->
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID_HIER
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET_HIER
JWT_SECRET=this is my custom Secret key for authentication
```


Als je de backend service wilt starten, gebruik `dotnet run` in een terminal. Zorg dat deze terminal in de `thewhites-api/` map zit.


### Migrations

Gebruiker het volgende om migrations te gebruiken:
- `dotnet restore`
- `dotnet tool install --global dotnet-ef --version 6.*`

Commands:
- `dotnet ef migrations add NUMMER`: maak nieuwe versie van de database schema na wijzigingen van de database code (Models etc.).
- `dotnet ef database update`: Als je dit moet gebruiken op de cloud database (/db.dewhites.nl), stuur ff bericht naar richano.