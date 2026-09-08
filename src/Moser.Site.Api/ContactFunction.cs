using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Moser.Shared;

namespace Moser.Site.Api;

public sealed class ContactFunction
{
    private readonly ContactService _service;
    private readonly ILogger<ContactFunction> _logger;

    public ContactFunction(ContactService service, ILogger<ContactFunction> logger)
    {
        _service = service;
        _logger = logger;
    }

    [Function("Contact")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "contact")] HttpRequest req)
    {
        ContactRequest? body;
        try
        {
            body = await req.ReadFromJsonAsync<ContactRequest>();
        }
        catch (System.Text.Json.JsonException)
        {
            return new BadRequestObjectResult(new { errors = new[] { "Send JSON with name, company, and message." } });
        }

        var result = await _service.SubmitAsync(body, req.HttpContext.RequestAborted);
        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(new { errors = result.Errors });
        }

        if (!string.IsNullOrEmpty(result.LeadId))
        {
            _logger.LogInformation("Contact accepted {LeadId}", result.LeadId);
        }

        return new OkObjectResult(new ContactResponse { Message = ContactValidation.SuccessMessage });
    }
}
