using System.Collections.Concurrent;
using Moser.Shared;

namespace Moser.Site.Api.Storage;

public sealed class InMemoryLeadStore : ILeadStore
{
    private readonly ConcurrentDictionary<string, ContactRequest> _items = new();

    public Task<string> SaveAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid().ToString("N");
        _items[id] = request;
        return Task.FromResult(id);
    }
}
