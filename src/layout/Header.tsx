import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/people", label: "People" },
  { to: "/projects", label: "Projects" },
  { to: "/publications", label: "Publications" },
  { to: "/news", label: "News" },
] as const;

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50  bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          to="/"
          className="text-xl font-heading font-medium leading-tight text-primary"
        >
          Co-Well
          <br />
          Comp Lab
        </Link>
        <nav className="flex gap-6">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={
                location.pathname === to ||
                (to !== "/" && location.pathname.startsWith(to))
                  ? "font-medium text-accent"
                  : "transition duration-300 text-body-muted hover:text-accent"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
