using System.Text;
using AspTest.Services;
using AspTest.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:8055");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            //policy.WithOrigins("https://dewhites.nl");
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
/*.AddCookie("cookies", options =>
{
   options.Cookie.Name = "appcookie";
   options.Cookie.SameSite = SameSiteMode.Strict;
   options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
})*/
.AddJwtBearer(options =>
{
    // Configure JwtBearer options as needed
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Configure token validation parameters
        ValidIssuer = "http://localhost:8066/",
        ValidAudience = "http://localhost:8066/",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
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

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();
