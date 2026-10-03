import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cases, site } from "../content";

export function WorkPage() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `Work — ${site.name}`;
  }, []);

  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <h1>Work</h1>
      <p className="lede">Short notes on what the work was and what shipped. Same facts as the CV.</p>
      {cases.map((item) => (
        <article key={item.id} className="case" id={item.id}>
          <p className="case-kind">{item.kind}</p>
          <h2>{item.title}</h2>
          <p className="meta">{item.meta}</p>
          <p>
            {item.body}{" "}
            {item.href && item.hrefLabel && <a href={item.href}>{item.hrefLabel}</a>}
          </p>
        </article>
      ))}
    </>
  );
}
