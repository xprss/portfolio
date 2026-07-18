import { useEffect, useState, type PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import type { Profile, SocialLink } from "../../models/portfolio";

interface MainLayoutProps extends PropsWithChildren {
  profile: Profile;
  socials: SocialLink[];
}

const navigationItems = [
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" }
];

export function MainLayout({ profile, socials, children }: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className="topbar__nav" aria-label="Primary">
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
        <div className="topbar__socials" aria-label="Social links">
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
        <div>
          <p className="footer__title">git status</p>
          <p className="footer__text">working tree clean, ready for production.</p>
        </div>
        <NavLink className="footer__link" to="/">
          return to HEAD
        </NavLink>
      </footer>
    </div>
  );
}
