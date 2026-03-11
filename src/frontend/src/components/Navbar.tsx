import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "YouTube", href: "#youtube" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo + Brand */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/assets/uploads/Gemini_Generated_Image_o0xt2bo0xt2bo0xt-1.png"
            alt="The Legal Diplomat"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-base font-bold text-gold hidden sm:block tracking-wide">
            The Legal Diplomat
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-gold transition-colors font-medium tracking-wide"
              >
                {link.label}
              </button>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                data-ocid="nav.admin.link"
                className="text-sm text-primary hover:text-accent transition-colors font-medium tracking-wide"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {identity ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clear}
              data-ocid="nav.logout.button"
              className="border-primary/40 text-primary hover:bg-primary/10 text-xs"
            >
              Logout
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              data-ocid="nav.login.button"
              className="gold-gradient text-primary-foreground text-xs"
            >
              {loginStatus === "logging-in" ? "Connecting..." : "Login"}
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-card border-b border-border px-4 pb-4"
          >
            <ul className="flex flex-col gap-3 pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors w-full text-left py-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-primary"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li className="pt-2">
                {identity ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clear}
                    className="border-primary/40 text-primary w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={login}
                    className="gold-gradient text-primary-foreground w-full"
                  >
                    Login
                  </Button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
