using AspTest;
using AspTest.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AspDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IGebruikerRepository, GebruikerRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddCookie().AddGoogle(GoogleDefaults.AuthenticationScheme, options => {
    options.ClientId = "712169306292-99g45f7oiuu0fe4b226j48cl02fo7qsj.apps.googleusercontent.com";
    options.ClientSecret = "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";
});



builder.Services
    .AddHttpClient("CoopService", client =>
    {
        //client.BaseAddress = configuration.BaseAddress;
    })
    .AddHttpMessageHandler<MySpecialHeaderDelegatingHandler>();


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

app.MapControllers();

app.Run();
