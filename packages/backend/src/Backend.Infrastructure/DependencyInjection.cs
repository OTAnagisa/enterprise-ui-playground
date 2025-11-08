using Backend.Domain.Repositories;
using Backend.Infrastructure.Configuration;
using Backend.Infrastructure.Persistence;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Backend.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Configure CosmosDB settings
        services.Configure<CosmosDbSettings>(
            configuration.GetSection(CosmosDbSettings.SectionName));

        // Register CosmosDB client
        services.AddSingleton<CosmosClient>(sp =>
        {
            var settings = sp.GetRequiredService<IOptions<CosmosDbSettings>>().Value;
            return new CosmosClient(settings.ConnectionString);
        });

        // Register Container
        services.AddSingleton<Container>(sp =>
        {
            var settings = sp.GetRequiredService<IOptions<CosmosDbSettings>>().Value;
            var client = sp.GetRequiredService<CosmosClient>();
            return client.GetContainer(settings.DatabaseName, settings.ContainerName);
        });

        // Register repositories
        services.AddScoped<ISearchRepository, CosmosSearchRepository>();

        return services;
    }
}
