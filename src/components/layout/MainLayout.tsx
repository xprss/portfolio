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

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.35 9.35 0 0 1 12 5.92c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M3.75 5.25h16.5c.97 0 1.75.78 1.75 1.75v10c0 .97-.78 1.75-1.75 1.75H3.75C2.78 18.75 2 17.97 2 17V7c0-.97.78-1.75 1.75-1.75Zm.57 1.5 7.68 5.3 7.68-5.3H4.32Zm16.18 1.42-8.07 5.57a.75.75 0 0 1-.86 0L3.5 8.17V17c0 .14.11.25.25.25h16.5c.14 0 .25-.11.25-.25V8.17Z" />
        </svg>
      );
  }
}

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
      if (window.innerWidth > 860) {
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
              aria-label={social.label}
              title={social.label}
              onClick={() => setMenuOpen(false)}
            >
              {getSocialIcon(social.label)}
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
