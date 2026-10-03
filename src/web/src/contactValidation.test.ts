import { describe, expect, it } from "vitest";
import { isHoneypotFilled, validateContact, type ContactPayload } from "./contactValidation";

const valid: ContactPayload = {
  name: "Ada",
  company: "Example",
  email: "ada@example.com",
  need: "ui",
  message: "Hello, I would like to talk about a .NET contract.",
  website: "",
};

describe("validateContact", () => {
  it("accepts a complete request", () => {
    expect(validateContact(valid)).toEqual([]);
  });

  it("rejects an empty request", () => {
    const errors = validateContact({ ...valid, name: "", email: "", message: "", need: "" });
    expect(errors.some((error) => error.includes("Name"))).toBe(true);
    expect(errors.some((error) => error.includes("Email"))).toBe(true);
    expect(errors.some((error) => error.includes("Message"))).toBe(true);
  });

  it("rejects an unknown service", () => {
    const errors = validateContact({ ...valid, need: "not-a-service" });
    expect(errors.some((error) => error.toLowerCase().includes("service"))).toBe(true);
  });
});

describe("isHoneypotFilled", () => {
  it("detects a filled website field", () => {
    expect(isHoneypotFilled({ ...valid, website: "http://spam.example" })).toBe(true);
    expect(isHoneypotFilled(valid)).toBe(false);
  });
});
