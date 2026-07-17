import { Link } from "react-router-dom";
import type { Profile } from "../../models/portfolio";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero__terminal">
        <div className="terminal__bar">
          <span />
          <span />
          <span />
        </div>
        <p className="terminal__line">$ whoami</p>
        <h1>{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__meta">
          <span>location: {profile.location}</span>
          <span>status: {profile.availability}</span>
        </div>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            view projects
          </a>
          <a className="button button--secondary" href={`mailto:${profile.email}`}>
            git commit -m "hello"
          </a>
        </div>
      </div>
      <aside className="hero__panel">
        <p className="hero__panel-label">README.md</p>
        <p>{profile.tagline}</p>
        <div className="hero__branch-card">
          <span>active branch</span>
          <strong>feature/classic-portfolio</strong>
        </div>
        <Link className="hero__project-link" to="/projects/mergeboard">
          inspect featured project
        </Link>
      </aside>
    </section>
  );
}
