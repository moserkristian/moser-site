namespace Moser.Shared;

public sealed class ContactRequest
{
    public string? Name { get; set; }
    public string? Company { get; set; }
    public string? Email { get; set; }
    public string? Message { get; set; }

    /// <summary>Honeypot. Browsers leave this empty.</summary>
    public string? Website { get; set; }
}
