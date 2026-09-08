using Azure.Data.Tables;
using Moser.Shared;

namespace Moser.Site.Api.Storage;

public sealed class TableLeadStore : ILeadStore
{
    public const string TableName = "leads";
    private readonly TableClient _table;

    public TableLeadStore(string connectionString)
    {
        _table = new TableClient(connectionString, TableName);
    }

    public async Task<string> SaveAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        await _table.CreateIfNotExistsAsync(cancellationToken);
        var submitted = DateTimeOffset.UtcNow;
        var id = Guid.NewGuid().ToString("N");
        var entity = new TableEntity(submitted.ToString("yyyyMM"), id)
        {
            ["Name"] = request.Name?.Trim() ?? "",
            ["Company"] = request.Company?.Trim() ?? "",
            ["Email"] = request.Email?.Trim() ?? "",
            ["Message"] = request.Message?.Trim() ?? "",
            ["SubmittedUtc"] = submitted
        };

        await _table.AddEntityAsync(entity, cancellationToken);
        return id;
    }
}
