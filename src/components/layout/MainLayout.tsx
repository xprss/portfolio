import { useEffect, useState, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import type { Profile, SocialLink } from "../../models/portfolio";

interface MainLayoutProps extends PropsWithChildren {
  profile: Profile;
  socials: SocialLink[];
}

const navigationItems = [
  { label: "Chi sono", href: "/#about" },
  { label: "Competenze", href: "/#skills" },
  { label: "Percorso", href: "/#experience" },
  { label: "Progetti", href: "/#projects" },
  { label: "Contatti", href: "/#contact" }
];

export function MainLayout({ profile, socials, children }: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled((current) => {
        if (!current && currentY > 56) {
          return true;
        }

        if (current && currentY < 20) {
          return false;
        }

        return current;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const topbarClassName = [
    "topbar",
    menuOpen ? "topbar--menu-open" : "",
    isScrolled ? "topbar--scrolled" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="app-shell">
      <header className={topbarClassName}>
        <div className="topbar__brand">
          <div className="topbar__lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="topbar__prompt">~/portfolio</span>
          <Link className="topbar__name" to="/">
            {profile.name}
          </Link>
        </div>
        <button
          type="button"
          className="topbar__menu-button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Chiudi il menu di navigazione" : "Apri il menu di navigazione"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className="topbar__nav"
          aria-label="Navigazione principale"
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="topbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="topbar__socials" aria-label="Link social">
          {socials.map((social) => (
            <a
              key={social.label}
              className="social-chip"
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <p className="footer__signature">
          Vincenzo Sagristano • xprss • {currentYear}
        </p>
      </footer>
    </div>
  );
}
