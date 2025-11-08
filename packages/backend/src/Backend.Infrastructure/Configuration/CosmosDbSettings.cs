namespace Backend.Infrastructure.Configuration;

public class CosmosDbSettings
{
    public const string SectionName = "CosmosDb";

    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = "SearchDatabase";
    public string ContainerName { get; set; } = "SearchItems";
}
