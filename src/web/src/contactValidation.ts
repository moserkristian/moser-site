export const successMessage = "Thanks — I’ll reply on a business day.";

const nameMax = 100;
const companyMax = 200;
const emailMax = 254;
const needMax = 40;
const messageMin = 10;
const messageMax = 4000;

const allowedNeeds = ["apis", "ui", "architecture", "integration", "contract"];

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  need: string;
  message: string;
  website: string;
};

export function validateContact(input: ContactPayload): string[] {
  const errors: string[] = [];
  const name = input.name.trim();
  const company = input.company.trim();
  const email = input.email.trim();
  const need = input.need.trim();
  const message = input.message.trim();

  if (name.length === 0) errors.push("Name is required.");
  else if (name.length > nameMax) errors.push(`Name must be at most ${nameMax} characters.`);

  if (company.length > companyMax) errors.push(`Company must be at most ${companyMax} characters.`);

  if (need.length > needMax || (need.length > 0 && !allowedNeeds.includes(need.toLowerCase()))) {
    errors.push("Choose a service from the list.");
  }

  if (email.length === 0) errors.push("Email is required.");
  else if (email.length > emailMax || !emailPattern.test(email)) errors.push("Email does not look valid.");

  if (message.length === 0) errors.push("Message is required.");
  else if (message.length < messageMin) errors.push(`Message must be at least ${messageMin} characters.`);
  else if (message.length > messageMax) errors.push(`Message must be at most ${messageMax} characters.`);

  return errors;
}

export function isHoneypotFilled(input: ContactPayload): boolean {
  return input.website.trim().length > 0;
}
