using Moser.Shared;
using Moser.Site.Api.Storage;

namespace Moser.Site.Api;

public sealed class ContactService
{
    private readonly ILeadStore _store;

    public ContactService(ILeadStore store)
    {
        _store = store;
    }

    public async Task<ContactSubmitResult> SubmitAsync(ContactRequest? request, CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return ContactSubmitResult.Invalid(["Send JSON with name, company, and message."]);
        }

        if (ContactValidation.IsHoneypotFilled(request))
        {
            return ContactSubmitResult.Ok();
        }

        var errors = ContactValidation.Validate(request);
        if (errors.Count > 0)
        {
            return ContactSubmitResult.Invalid(errors);
        }

        var id = await _store.SaveAsync(request, cancellationToken);
        return ContactSubmitResult.Ok(id);
    }
}

public sealed class ContactSubmitResult
{
    public bool Succeeded { get; private init; }
    public IReadOnlyList<string> Errors { get; private init; } = [];
    public string? LeadId { get; private init; }

    public static ContactSubmitResult Ok(string? leadId = null) => new()
    {
        Succeeded = true,
        LeadId = leadId
    };

    public static ContactSubmitResult Invalid(IReadOnlyList<string> errors) => new()
    {
        Succeeded = false,
        Errors = errors
    };
}
