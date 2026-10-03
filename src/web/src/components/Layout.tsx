import { Link, NavLink, Outlet } from "react-router-dom";
import { site } from "../content";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services", end: false },
  { to: "/work", label: "Work", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="shell">
        <header className="site-header">
          <div className="brand">
            <Link className="brand-name" to="/">
              {site.name}
            </Link>
            <p className="brand-meta">
              {site.company} · {site.place} · Remote
            </p>
          </div>
          <nav className="nav" aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className="nav-link">
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main id="main" className="site-main" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="site-footer">
          <p>
            {site.name} · {site.company} · {site.place} · <a href={site.gitHub}>GitHub</a> · <Link to="/cv">CV</Link>
          </p>
          <p className="site-note">React and TypeScript on Azure Static Web Apps. Azure Functions handle the form.</p>
        </footer>
      </div>
    </>
  );
}
