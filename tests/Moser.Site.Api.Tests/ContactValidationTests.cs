using Moser.Shared;

namespace Moser.Site.Api.Tests;

public sealed class ContactValidationTests
{
    [Fact]
    public void Rejects_empty_request()
    {
        var errors = ContactValidation.Validate(new ContactRequest());
        Assert.Contains(errors, e => e.Contains("Name", StringComparison.Ordinal));
        Assert.Contains(errors, e => e.Contains("Email", StringComparison.Ordinal));
        Assert.Contains(errors, e => e.Contains("Message", StringComparison.Ordinal));
    }

    [Fact]
    public void Accepts_a_complete_request()
    {
        var errors = ContactValidation.Validate(new ContactRequest
        {
            Name = "Ada",
            Email = "ada@example.com",
            Company = "Example",
            Message = "Hello, I would like to talk about a .NET contract."
        });

        Assert.Empty(errors);
    }

    [Fact]
    public void Detects_honeypot()
    {
        Assert.True(ContactValidation.IsHoneypotFilled(new ContactRequest { Website = "http://spam.example" }));
        Assert.False(ContactValidation.IsHoneypotFilled(new ContactRequest()));
    }
}
