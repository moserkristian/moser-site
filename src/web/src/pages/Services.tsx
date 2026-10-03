import { useEffect } from "react";
import { Link } from "react-router-dom";
import { services, site } from "../content";

export function ServicesPage() {
  useEffect(() => {
    document.title = `Services — ${site.name}`;
  }, []);

  return (
    <>
      <h1>Services</h1>
      <p className="lede">Contract work through {site.company}.</p>
      <div className="service-list">
        {services.map((service) => (
          <article key={service.id} className="service-block" aria-labelledby={`service-${service.id}`}>
            <h2 id={`service-${service.id}`}>{service.title}</h2>
            <p className="lede">{service.summary}</p>
            <ul className="point-list">
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>
              <Link className="button" to={`/contact?need=${service.id}`}>
                Contact
              </Link>
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
