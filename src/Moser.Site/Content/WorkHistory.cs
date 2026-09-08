namespace Moser.Site.Content;

public sealed record WorkItem(
    string Name,
    string Role,
    string Dates,
    string Place,
    bool PersonalProduct,
    IReadOnlyList<string> Notes,
    string? Url = null);

public static class WorkHistory
{
    public const string Profile =
        "Senior .NET engineer (C#, ASP.NET Core, Blazor). Product and client work in laboratory APIs, aviation data, and industrial cloud. Open to contract work through Moser Consulting s.r.o.";

    public const string CurrentEmployer = "Moser Consulting s.r.o.";
    public const string CurrentRole = "Senior .NET engineer";
    public const string CurrentDates = "Aug 2024 – Present";
    public const string CurrentPlace = "Bratislava / Remote";

    public static readonly WorkItem NgAviation = new(
        "NG Aviation",
        "Client",
        "Mar 2025 – Oct 2025",
        "Bratislava · Hybrid",
        false,
        [
            "NOTAM ingestion to AIXM JSON and publish to a cloud database.",
            "REST APIs over aerospace data.",
            "PostgreSQL / PostGIS for geospatial queries.",
            "Docker and CI/CD.",
            "Cleaned up layering in existing services."
        ]);

    public static readonly WorkItem ComAp = new(
        "ComAp Group",
        "Client",
        "Aug 2024 – Feb 2025",
        "Prague · Hybrid",
        false,
        [
            "Early cloud platform work: service boundaries, inter-service APIs, Clean Architecture split.",
            ".NET Aspire for local multi-service run and test.",
            "Blazor UI against those APIs.",
            "Fewer unnecessary database round trips with a clearer command/query split."
        ]);

    public static readonly WorkItem SfCfo = new(
        "sfCFO",
        "Client",
        "Jan 2026 – Feb 2026",
        "Remote",
        false,
        [
            "Short scoped delivery on a .NET 9 Blazor Server product (MudBlazor, EF Core): Mapbox GL map view and E.164 phone input."
        ]);

    public static readonly WorkItem PolicyQa = new(
        "Policy Q&A",
        "Personal product",
        "2026 – Present",
        "Personal product",
        true,
        [
            "Markdown policies to retrieval to answers with citations.",
            "C# Allow / Deny / NeedsHuman layer, with tests.",
            "Blazor, .NET Aspire, Ollama."
        ],
        "https://github.com/moserkristian/Moser.RagAi");

    public static readonly WorkItem ThermoFisher = new(
        "Thermo Fisher Scientific",
        "Senior .NET engineer",
        "Sep 2022 – Apr 2024",
        "Bratislava · Hybrid",
        false,
        [
            "ASP.NET Core Web APIs for laboratory test results.",
            "AWS for file handling.",
            "Tests, monitoring, pipelines.",
            "Written English across time zones."
        ]);

    public static readonly WorkItem SocialnaPoistovna = new(
        "Sociálna poisťovňa",
        "Software engineer",
        "Sep 2019 – Jan 2022",
        "Bratislava · Hybrid",
        false,
        [
            ".NET internal systems.",
            "Incident handling.",
            "Backup and recovery automation."
        ]);

    public static readonly WorkItem Frequentis = new(
        "Frequentis",
        "Junior software engineer",
        "Jan 2018 – Jun 2019",
        "Bratislava · Hybrid",
        false,
        [
            "Optimised 6–7 multithreaded components; measured about 24% better performance.",
            "Real-time client–server UI.",
            "Small HTML/JS client."
        ]);

    public static readonly IReadOnlyList<WorkItem> CurrentClients =
        [NgAviation, ComAp, SfCfo, PolicyQa];

    public static readonly IReadOnlyList<WorkItem> EarlierRoles =
        [ThermoFisher, SocialnaPoistovna, Frequentis];
}
