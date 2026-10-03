import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cases, services, site } from "../content";

const highlights = ["thermo-fisher", "ng-aviation", "comap"];

function firstSentence(text: string) {
  const cut = text.indexOf(". ");
  return cut === -1 ? text : text.slice(0, cut + 1);
}

export function HomePage() {
  useEffect(() => {
    document.title = site.name;
  }, []);

  return (
    <>
      <section className="hero">
        <h1>{site.hero}</h1>
        <p className="lede">{site.lede}</p>
        <p className="actions">
          <Link className="button" to="/contact">
            Contact
          </Link>
          <Link className="button button-quiet" to="/services">
            Services
          </Link>
        </p>
      </section>
      <section className="section" aria-labelledby="home-services">
        <h2 id="home-services">Services</h2>
        <ul className="offer-grid">
          {services.map((service) => (
            <li key={service.id}>
              <Link className="offer-card" to={`/contact?need=${service.id}`}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="section" aria-labelledby="home-work">
        <h2 id="home-work" className="visually-hidden">
          Selected work
        </h2>
        <ul className="work-lines">
          {highlights.map((id) => {
            const item = cases.find((entry) => entry.id === id);
            if (!item) return null;
            return (
              <li key={item.id}>
                <Link to={`/work#${item.id}`}>{item.title}</Link>
                <span>{firstSentence(item.body)}</span>
              </li>
            );
          })}
        </ul>
        <p className="section-more">
          <Link to="/work">More work</Link>
        </p>
      </section>
    </>
  );
}
