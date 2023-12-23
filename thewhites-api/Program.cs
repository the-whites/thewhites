using AspTest;
using AspTest.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;


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
                          policy.WithOrigins("https://dewhites.nl");
                      });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddCookie().AddGoogle(GoogleDefaults.AuthenticationScheme, options => {
    options.ClientId = "712169306292-99g45f7oiuu0fe4b226j48cl02fo7qsj.apps.googleusercontent.com";
    options.ClientSecret = "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";
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
