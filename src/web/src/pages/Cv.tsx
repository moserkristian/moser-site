import { useEffect } from "react";
import { cvClients, cvEarlier, cvSkills, site } from "../content";

export function CvPage() {
  useEffect(() => {
    document.title = `CV — ${site.name}`;
    document.body.classList.add("cv-route");
    return () => document.body.classList.remove("cv-route");
  }, []);

  return (
    <main id="main" className="cv-print-main">
      <p className="cv-screen-bar">
        <a href="/">Site</a>
        {" · "}
        <a href="/Kristian-Moser-CV.pdf">PDF</a>
        {" · "}
        print this page for the two-page CV.
      </p>
      <article className="cv" lang="en">
        <header className="cv-head">
          <h1>{site.name}</h1>
          <p className="cv-title">{site.title}</p>
          <p className="cv-contact">
            {site.place} · {site.email} · {site.phone}
          </p>
          <p className="cv-contact">
            {site.linkedInHandle} · {site.gitHubHandle}
          </p>
        </header>
        <section>
          <h2>Profile</h2>
          <p>{site.profile}</p>
        </section>
        <section>
          <h2>Technical skills</h2>
          {cvSkills.map((skill) => (
            <p key={skill.label}>
              <span className="cv-label">{skill.label}</span> {skill.value}
            </p>
          ))}
        </section>
        <section>
          <h2>Experience</h2>
          <h3>
            Senior .NET engineer — {site.company}
          </h3>
          <p className="cv-meta">Aug 2024 – Present · Bratislava / Remote</p>
          {cvClients.map((client) => (
            <div key={client.name}>
              <h4>{client.name}</h4>
              <p className="cv-meta">{client.meta}</p>
              <ul>
                {client.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="cv-page-2">
          {cvEarlier.map((role) => (
            <div key={role.heading}>
              <h3>{role.heading}</h3>
              <p className="cv-meta">{role.meta}</p>
              <ul>
                {role.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
          <h2>Languages</h2>
          <p>Slovak (native), English (professional).</p>
        </section>
      </article>
    </main>
  );
}
