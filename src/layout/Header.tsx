import { useEffect, useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderDesktopNav = () => (
    <nav className="hidden md:flex gap-6">
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
  );

  const renderMobileToggleButton = () => (
    <button
      type="button"
      className="fixed top-6 right-6 z-[70] md:hidden inline-flex items-center justify-center rounded-md p-2 text-body-muted hover:text-accent hover:bg-muted focus:outline-none"
      onClick={() => setIsMobileMenuOpen((open) => !open)}
      aria-label="Toggle navigation menu"
      aria-expanded={isMobileMenuOpen}
    >
      <span className="sr-only">
        {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
      </span>
      <div className="space-y-1.5">
        <span
          className={`block h-0.5 w-6 bg-current transform transition duration-300 ${
            isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transform transition duration-300 ${
            isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </div>
    </button>
  );

  const renderMobileMenu = () => (
    <div
      className={`fixed inset-y-0 right-0 z-60 w-64 bg-background shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <nav className="flex flex-col gap-4 px-6 pt-16 pb-6">
        {navItems.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={
              location.pathname === to ||
              (to !== "/" && location.pathname.startsWith(to))
                ? "font-medium text-accent"
                : "text-body-muted hover:text-accent transition duration-300"
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );

  const renderMobileBackdrop = () => (
    <button
      type="button"
      className={`fixed inset-0 z-50 bg-black/30 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
      aria-hidden="true"
    />
  );

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="text-xl font-heading font-medium leading-tight text-primary flex items-center gap-4"
          >
            <img src="./img/logo.svg" alt="Co-Well Lab" className="w-12 h-12" />
            Co-Well
            <br />
            Lab
          </Link>
          {renderDesktopNav()}
        </div>
      </header>

      {renderMobileToggleButton()}
      {renderMobileMenu()}
      {renderMobileBackdrop()}
    </>
  );
}
