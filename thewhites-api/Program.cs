using System.Text;
using AspTest.Services;
using AspTest.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using AspTest;


var builder = WebApplication.CreateBuilder(args);

var root = Directory.GetCurrentDirectory();
var dotenv = Path.Combine(root, ".env");
DotEnv.Load(dotenv);

// Add services to the container.

builder.Services.AddDbContext<AspDbContext>(options =>
    options.UseSqlServer(
        $"Data Source={Environment.GetEnvironmentVariable("MSSQL_CON_HOST")},{Environment.GetEnvironmentVariable("MSSQL_CON_PORT")};Database={Environment.GetEnvironmentVariable("MSSQL_CON_DB")};Integrated Security=false;User ID={Environment.GetEnvironmentVariable("MSSQL_CON_USER")};Password={Environment.GetEnvironmentVariable("MSSQL_CON_PASS")};"
    )
);

builder.Services.AddScoped<IGebruikerRepository, GebruikerRepository>();
builder.Services.AddScoped<IErvaringsdeskundigeRepository, ErvaringsdeskundigeRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IOnderzoekRepository, OnderzoekRepository>();
builder.Services.AddScoped<IBedrijfRepository, BedrijfRepository>();
builder.Services.AddScoped<IBeperkingRepository, BeperkingRepository>();
builder.Services.AddScoped<IOnderzoekTypeRepository, OnderzoekTypeRepository>();

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:8055");
            policy.WithOrigins("https://dewhites.nl");
            policy.AllowAnyHeader();
            policy.AllowCredentials();

        }
    );
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = "Google";
})
.AddJwtBearer(options =>
{
    // Configure JwtBearer options as needed
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Configure token validation parameters
        ValidIssuer = "api.dewhites.nl",
        ValidAudience = "dewhites.nl",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero
    };

    // Set the cookie as the token source
    /*options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["ac_token"];
            return Task.CompletedTask;
        }
    };*/
})
.AddGoogle(googleOptions =>
{
    googleOptions.ClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID") ?? "None";
    googleOptions.ClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET") ?? "None";

    // Disable the automatic challenge for Google authentication
    googleOptions.Events.OnRedirectToAuthorizationEndpoint = context =>
    {
        context.Response.StatusCode = 401; // Unauthorized
        return Task.CompletedTask;
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
