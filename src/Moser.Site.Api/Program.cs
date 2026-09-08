using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Moser.Site.Api;
using Moser.Site.Api.Storage;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices((context, services) =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddSingleton<ContactService>();
        services.AddSingleton<ILeadStore>(sp =>
        {
            var config = sp.GetRequiredService<IConfiguration>();
            var connection = config["LEADS_STORAGE"] ?? config["AzureWebJobsStorage"];
            if (string.IsNullOrWhiteSpace(connection) ||
                connection.Equals("InMemory", StringComparison.OrdinalIgnoreCase))
            {
                return new InMemoryLeadStore();
            }

            return new TableLeadStore(connection);
        });
    })
    .Build();

host.Run();
