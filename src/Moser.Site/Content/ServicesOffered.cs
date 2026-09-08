namespace Moser.Site.Content;

public sealed record ServiceOffer(
    string Id,
    string Title,
    string Summary,
    IReadOnlyList<string> Points);

public static class ServicesOffered
{
    public const string ApisId = "apis";
    public const string BlazorId = "blazor";
    public const string ArchitectureId = "architecture";
    public const string IntegrationId = "integration";
    public const string ContractId = "contract";

    public static readonly ServiceOffer Apis = new(
        ApisId,
        "APIs and backends",
        "ASP.NET Core APIs, tests, and file handling.",
        [
            "REST APIs with tests.",
            "File handling and monitoring.",
            "Cleanup of messy layering."
        ]);

    public static readonly ServiceOffer Blazor = new(
        BlazorId,
        "Blazor applications",
        "Blazor UI on the same stack as the API.",
        [
            "Blazor Server or WebAssembly.",
            "Forms and operational screens.",
            ".NET Aspire when more than one process has to run locally."
        ]);

    public static readonly ServiceOffer Architecture = new(
        ArchitectureId,
        "Service architecture",
        "Service boundaries and a local run that works.",
        [
            "Inter-service APIs.",
            "Fewer database round trips.",
            "Docker and CI/CD in the same delivery."
        ]);

    public static readonly ServiceOffer Integration = new(
        IntegrationId,
        "Data integration",
        "Feeds into a cloud database, including geospatial.",
        [
            "Ingest and publish (for example NOTAM to AIXM JSON).",
            "PostgreSQL / PostGIS.",
            "Pipelines with tests."
        ]);

    public static readonly IReadOnlyList<ServiceOffer> All = [Apis, Blazor, Architecture, Integration];

    public static readonly IReadOnlyList<(string Id, string Label)> ContactNeeds =
    [
        (ApisId, "APIs and backends"),
        (BlazorId, "Blazor application"),
        (ArchitectureId, "Service architecture"),
        (IntegrationId, "Data integration"),
        (ContractId, "Something else")
    ];

    public static bool IsKnownNeed(string? need)
    {
        if (string.IsNullOrWhiteSpace(need))
        {
            return true;
        }

        var value = need.Trim();
        return ContactNeeds.Any(n => n.Id.Equals(value, StringComparison.OrdinalIgnoreCase));
    }
}
