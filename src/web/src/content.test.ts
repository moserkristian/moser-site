import { describe, expect, it } from "vitest";
import { cases, cvClients, cvEarlier, cvSkills, selectedNeed, services, site } from "./content";

const marketing = [
  site.hero,
  site.lede,
  ...services.flatMap((service) => [service.title, service.summary, ...service.points]),
  ...cases.flatMap((item) => [item.title, item.body]),
].join("\n");

const cv = [
  site.profile,
  site.phone,
  ...cvSkills.map((skill) => skill.value),
  ...cvClients.flatMap((client) => [client.name, ...client.notes]),
  ...cvEarlier.flatMap((role) => [role.heading, ...role.notes]),
].join("\n");

describe("selectedNeed", () => {
  it("accepts a known service and maps the old blazor id", () => {
    expect(selectedNeed("ui")).toBe("ui");
    expect(selectedNeed("blazor")).toBe("ui");
    expect(selectedNeed("nope")).toBe("");
    expect(selectedNeed(null)).toBe("");
  });
});

describe("public copy", () => {
  it("keeps job-seeking and phone off the marketing pages", () => {
    expect(marketing).not.toMatch(/available now|open to roles|TPP|\+421|rates/i);
    expect(marketing).not.toMatch(/GxP|AZ-204|AKS|engagement ended/i);
  });

  it("keeps the CV facts", () => {
    expect(cv).toContain(site.phone);
    expect(cv).toContain("SQL Server");
    expect(cv).toContain("PostgreSQL");
    expect(cv).toContain("AWS");
    expect(cv).toContain("Moser Consulting s.r.o.");
    expect(cv).toContain("Thermo Fisher Scientific");
    expect(cv).toContain("Sociálna poisťovňa");
    expect(cv).toContain("Frequentis");
    expect(cv).not.toMatch(/available now|GxP|AZ-204|AKS|engagement ended|German/i);
  });
});
