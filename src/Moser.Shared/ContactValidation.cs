using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Moser.Shared;

public static class ContactValidation
{
    public const string SuccessMessage = "Thanks — I’ll reply on a business day.";
    public const int NameMaxLength = 100;
    public const int CompanyMaxLength = 200;
    public const int EmailMaxLength = 254;
    public const int NeedMaxLength = 40;
    public const int MessageMinLength = 10;
    public const int MessageMaxLength = 4000;

    public static readonly string[] AllowedNeeds =
    [
        "apis",
        "ui",
        "architecture",
        "integration",
        "contract"
    ];

    public static IReadOnlyList<string> Validate(ContactRequest request)
    {
        var errors = new List<string>();

        if (request is null)
        {
            errors.Add("Send a name, company, and message.");
            return errors;
        }

        var name = request.Name?.Trim() ?? "";
        var company = request.Company?.Trim() ?? "";
        var email = request.Email?.Trim() ?? "";
        var need = request.Need?.Trim() ?? "";
        var message = request.Message?.Trim() ?? "";

        if (name.Length == 0)
        {
            errors.Add("Name is required.");
        }
        else if (name.Length > NameMaxLength)
        {
            errors.Add($"Name must be at most {NameMaxLength} characters.");
        }

        if (company.Length > CompanyMaxLength)
        {
            errors.Add($"Company must be at most {CompanyMaxLength} characters.");
        }

        if (need.Length > NeedMaxLength || (need.Length > 0 && !IsAllowedNeed(need)))
        {
            errors.Add("Choose a service from the list.");
        }

        if (email.Length == 0)
        {
            errors.Add("Email is required.");
        }
        else if (email.Length > EmailMaxLength || !IsEmail(email))
        {
            errors.Add("Email does not look valid.");
        }

        if (message.Length == 0)
        {
            errors.Add("Message is required.");
        }
        else if (message.Length < MessageMinLength)
        {
            errors.Add($"Message must be at least {MessageMinLength} characters.");
        }
        else if (message.Length > MessageMaxLength)
        {
            errors.Add($"Message must be at most {MessageMaxLength} characters.");
        }

        return errors;
    }

    public static bool IsHoneypotFilled(ContactRequest request) =>
        !string.IsNullOrWhiteSpace(request.Website);

    public static bool IsAllowedNeed(string need) =>
        AllowedNeeds.Contains(need, StringComparer.OrdinalIgnoreCase);

    private static bool IsEmail(string value)
    {
        if (!Regex.IsMatch(value, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.CultureInvariant))
        {
            return false;
        }

        try
        {
            _ = new MailAddress(value);
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }
}
