using Bunit;
using Moser.Site.Components;
using Moser.Site.Content;
using Moser.Site.Pages;

namespace Moser.Site.Tests;

public sealed class PrintLayoutTests : TestContext
{
    public PrintLayoutTests()
    {
        JSInterop.Mode = JSRuntimeMode.Loose;
    }

    [Fact]
    public void Cv_is_single_column_with_ats_headings_and_phone()
    {
        var cut = RenderComponent<CvDocument>();
        var text = cut.Markup;

        Assert.Contains(">Profile<", text);
        Assert.Contains(">Technical skills<", text);
        Assert.Contains(">Experience<", text);
        Assert.Contains(SiteCopy.Phone, text);
        Assert.Contains("SQL Server", text);
        Assert.Contains("PostgreSQL", text);
        Assert.Contains("AWS", text);
        Assert.Contains(WorkHistory.CurrentEmployer, text);
        Assert.Contains("NG Aviation", text);
        Assert.Contains("ComAp Group", text);
        Assert.Contains("sfCFO", text);
        Assert.Contains("Thermo Fisher Scientific", text);
        Assert.Contains("Sociálna poisťovňa", text);
        Assert.Contains("Frequentis", text);
        Assert.Contains("cv-page-2", text);
    }

    [Fact]
    public void Cv_keeps_one_employer_for_current_work_and_avoids_banned_claims()
    {
        var cut = RenderComponent<CvDocument>();
        var text = cut.Markup;

        var employer = text.IndexOf(WorkHistory.CurrentEmployer, StringComparison.Ordinal);
        var sfCfo = text.IndexOf("sfCFO", StringComparison.Ordinal);
        Assert.True(employer >= 0 && sfCfo > employer);

        Assert.DoesNotContain("engagement ended", text, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("GxP", text);
        Assert.DoesNotContain("regulated", text, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("AZ-204", text);
        Assert.DoesNotContain("AKS", text);
        Assert.DoesNotContain("German", text);
        Assert.DoesNotContain("available now", text, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Home_has_no_phone_and_no_campaign_copy()
    {
        var cut = RenderComponent<Home>();
        var text = cut.Markup;

        Assert.Contains(SiteCopy.Hero, text);
        Assert.Contains("Contact", text);
        Assert.Contains("Services", text);
        Assert.DoesNotContain(SiteCopy.Name, text);
        Assert.DoesNotContain(SiteCopy.Phone, text);
        Assert.DoesNotContain("+421", text);
        Assert.DoesNotContain("6–12", text);
        Assert.DoesNotContain("6-12", text);
        Assert.DoesNotContain("B2B", text);
        Assert.DoesNotContain("CET", text);
        Assert.DoesNotContain("available now", text, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("WASM", text);
        Assert.DoesNotContain("AKS", text);
    }
}
