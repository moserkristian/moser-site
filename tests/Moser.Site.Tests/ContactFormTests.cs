using Bunit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moser.Site.Components;
using Moser.Shared;

namespace Moser.Site.Tests;

public sealed class ContactFormTests : TestContext
{
    public ContactFormTests()
    {
        JSInterop.Mode = JSRuntimeMode.Loose;
        Services.AddSingleton<IConfiguration>(new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ContactApiPath"] = "http://localhost/api/contact"
            })
            .Build());
    }

    [Fact]
    public void Renders_name_company_and_message_fields()
    {
        Services.AddSingleton(new HttpClient(new StubHandler(System.Net.HttpStatusCode.OK))
        {
            BaseAddress = new Uri("http://localhost")
        });

        var cut = RenderComponent<ContactForm>();

        Assert.Contains("Name", cut.Markup);
        Assert.Contains("Company", cut.Markup);
        Assert.Contains("Message", cut.Markup);
        Assert.DoesNotContain("+421", cut.Markup);
        Assert.DoesNotContain("918 829", cut.Markup);
    }

    [Fact]
    public void Shows_validation_errors_for_empty_submit()
    {
        Services.AddSingleton(new HttpClient(new StubHandler(System.Net.HttpStatusCode.OK))
        {
            BaseAddress = new Uri("http://localhost")
        });

        var cut = RenderComponent<ContactForm>();
        cut.Find("form").Submit();

        Assert.Contains("Name is required.", cut.Markup);
        Assert.Contains("Message is required.", cut.Markup);
    }

    [Fact]
    public void Shows_success_message_when_api_accepts()
    {
        Services.AddSingleton(new HttpClient(new StubHandler(System.Net.HttpStatusCode.OK))
        {
            BaseAddress = new Uri("http://localhost")
        });

        var cut = RenderComponent<ContactForm>();
        cut.Find("#contact-name").Change("Ada");
        cut.Find("#contact-email").Change("ada@example.com");
        cut.Find("#contact-company").Change("Example");
        cut.Find("#contact-message").Change("Hello, I would like to talk about a .NET contract.");
        cut.Find("form").Submit();

        cut.WaitForAssertion(() => Assert.Contains(ContactValidation.SuccessMessage, cut.Markup));
    }

    private sealed class StubHandler : HttpMessageHandler
    {
        private readonly System.Net.HttpStatusCode _status;

        public StubHandler(System.Net.HttpStatusCode status)
        {
            _status = status;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new HttpResponseMessage(_status)
            {
                Content = new StringContent("{\"message\":\"Thanks\"}")
            });
        }
    }
}
