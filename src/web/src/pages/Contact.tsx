import { useEffect } from "react";
import { ContactForm } from "../components/ContactForm";
import { site } from "../content";

export function ContactPage() {
  useEffect(() => {
    document.title = `Contact — ${site.name}`;
  }, []);

  return (
    <>
      <h1>Contact</h1>
      <p className="lede">Email is the reliable path. The form is optional.</p>
      <div className="contact-split">
        <aside className="contact-aside">
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a href={site.linkedIn}>{site.linkedInHandle}</a>
          </p>
          <p className="meta">
            {site.name} · {site.company} · Bratislava or remote
          </p>
        </aside>
        <ContactForm />
      </div>
    </>
  );
}
