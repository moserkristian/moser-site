import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { site } from "./content";

function html(path: string) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("pages", () => {
  it("renders the home offer without a phone number", () => {
    const page = html("/");
    expect(page).toContain("ASP.NET Core, React, and service architecture.");
    expect(page).toContain("ASP.NET Core Web APIs for laboratory test results.");
    expect(page).toContain("APIs and backends");
    expect(page).toContain("Web UI");
    expect(page).not.toContain(site.phone);
    expect(page).not.toContain("available now");
  });

  it("renders services, work, contact, cv, and a missing page", () => {
    expect(html("/services")).toContain("Data integration");
    const work = html("/work");
    expect(work).toContain('id="thermo-fisher"');
    expect(work).toContain("Policy Q&amp;A");
    const contact = html("/contact");
    expect(contact).toContain("What do you need");
    expect(contact).toContain(site.email);
    expect(contact).not.toContain(site.phone);
    const cv = html("/cv");
    expect(cv).toContain(site.phone);
    expect(cv).toContain("cv-page-2");
    expect(cv).toContain("SQL Server");
    expect(html("/missing")).toContain("That page is not here.");
  });
});
