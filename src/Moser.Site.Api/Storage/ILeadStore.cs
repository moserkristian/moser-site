using Moser.Shared;

namespace Moser.Site.Api.Storage;

public interface ILeadStore
{
    Task<string> SaveAsync(ContactRequest request, CancellationToken cancellationToken);
}
