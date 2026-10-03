import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { contactNeeds, selectedNeed } from "../content";
import { isHoneypotFilled, successMessage, validateContact, type ContactPayload } from "../contactValidation";

const empty: ContactPayload = {
  name: "",
  company: "",
  email: "",
  need: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [params] = useSearchParams();
  const [model, setModel] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const need = selectedNeed(params.get("need"));
    if (need) {
      setModel((current) => ({ ...current, need }));
    }
  }, [params]);

  function setField(field: keyof ContactPayload, value: string) {
    setModel((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setDone(false);
    const nextErrors = validateContact(model);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;

    if (isHoneypotFilled(model)) {
      setDone(true);
      setModel(empty);
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: model.name,
          company: model.company,
          email: model.email,
          need: model.need,
          message: model.message,
          website: model.website,
        }),
      });
      if (response.ok) {
        setDone(true);
        setModel(empty);
      } else if (response.status === 400) {
        const problem = (await response.json()) as { errors?: string[] };
        setErrors(problem.errors ?? ["Check the form and try again."]);
      } else {
        setErrors(["The form could not be sent. Email instead."]);
      }
    } catch {
      setErrors(["The form could not be sent. Email instead."]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input value={model.website} tabIndex={-1} autoComplete="off" onChange={(event) => setField("website", event.target.value)} />
        </label>
      </div>
      <p>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={model.name} onChange={(event) => setField("name", event.target.value)} />
      </p>
      <p>
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={model.email} onChange={(event) => setField("email", event.target.value)} />
      </p>
      <p>
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" autoComplete="organization" maxLength={200} value={model.company} onChange={(event) => setField("company", event.target.value)} />
      </p>
      <p>
        <label htmlFor="contact-need">What do you need</label>
        <select id="contact-need" name="need" value={model.need} onChange={(event) => setField("need", event.target.value)}>
          <option value="">Choose a service</option>
          {contactNeeds.map((need) => (
            <option key={need.id} value={need.id}>
              {need.label}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={8} value={model.message} onChange={(event) => setField("message", event.target.value)} />
      </p>
      {errors.length > 0 && (
        <ul className="form-errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {done && (
        <p className="form-ok" role="status">
          {successMessage}
        </p>
      )}
      <p>
        <button type="submit" className="button" disabled={busy}>
          Send
        </button>
      </p>
    </form>
  );
}
