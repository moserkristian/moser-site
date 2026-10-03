import { useEffect } from "react";
import { Link } from "react-router-dom";
import { site } from "../content";

export function NotFoundPage() {
  useEffect(() => {
    document.title = `Not found — ${site.name}`;
  }, []);

  return (
    <p role="alert">
      That page is not here. <Link to="/">Home</Link>
    </p>
  );
}
