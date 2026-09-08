using Moser.Shared;
using Moser.Site.Api;
using Moser.Site.Api.Storage;

namespace Moser.Site.Api.Tests;

public sealed class ContactServiceTests
{
    [Fact]
    public async Task Stores_valid_lead_without_requiring_sql()
    {
        var store = new InMemoryLeadStore();
        var service = new ContactService(store);

        var result = await service.SubmitAsync(new ContactRequest
        {
            Name = "Ada",
            Email = "ada@example.com",
            Company = "Example",
            Message = "Hello, I would like to talk about a .NET contract."
        }, CancellationToken.None);

        Assert.True(result.Succeeded);
        Assert.False(string.IsNullOrEmpty(result.LeadId));
    }

    [Fact]
    public async Task Honeypot_looks_successful_and_does_not_store()
    {
        var store = new CountingStore();
        var service = new ContactService(store);

        var result = await service.SubmitAsync(new ContactRequest
        {
            Name = "Ada",
            Email = "ada@example.com",
            Message = "Hello, I would like to talk about a .NET contract.",
            Website = "https://spam.example"
        }, CancellationToken.None);

        Assert.True(result.Succeeded);
        Assert.Equal(0, store.Count);
        Assert.Null(result.LeadId);
    }

    [Fact]
    public async Task Returns_validation_errors()
    {
        var service = new ContactService(new InMemoryLeadStore());
        var result = await service.SubmitAsync(new ContactRequest { Name = "Ada" }, CancellationToken.None);
        Assert.False(result.Succeeded);
        Assert.NotEmpty(result.Errors);
    }

    private sealed class CountingStore : ILeadStore
    {
        public int Count { get; private set; }

        public Task<string> SaveAsync(ContactRequest request, CancellationToken cancellationToken)
        {
            Count++;
            return Task.FromResult("id");
        }
    }
}
