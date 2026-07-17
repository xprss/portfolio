import type { PropsWithChildren } from "react";
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
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__prompt">~/portfolio</span>
          <Link className="topbar__name" to="/">
            {profile.name}
          </Link>
        </div>
        <nav className="topbar__nav" aria-label="Primary">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href} className="topbar__link">
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
