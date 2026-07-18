import { Link, useParams } from "react-router-dom";
import type { SiteContent } from "../models/portfolio";

interface ProjectPageProps {
  siteContent: SiteContent;
}

export function ProjectPage({ siteContent }: ProjectPageProps) {
  const { slug } = useParams();
  const project = siteContent.projects.find((entry) => entry.slug === slug);

  if (!project) {
    return (
      <div className="page page--narrow">
        <section className="project-detail">
          <p className="section__eyebrow">route mancante</p>
          <h1>Progetto non trovato.</h1>
          <p>Lo slug richiesto non esiste nel modello dati locale del portfolio.</p>
          <Link className="text-link" to="/">
            torna al portfolio
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <article className="project-detail">
        <p className="project-detail__label">progetto / {project.status}</p>
        <h1>{project.title}</h1>
        <p className="project-detail__summary">{project.summary}</p>
        <p className="project-detail__description">{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <section className="project-detail__section">
          <h2>Punti chiave</h2>
          <ul className="timeline__list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="project-detail__section project-detail__links">
          <a className="button button--primary" href={project.repository} target="_blank" rel="noreferrer">
            apri repository
          </a>
          {project.demo ? (
            <a className="button button--secondary" href={project.demo} target="_blank" rel="noreferrer">
              apri demo
            </a>
          ) : null}
        </section>

        <Link className="text-link" to="/#projects">
          torna all'indice progetti
        </Link>
      </article>
    </div>
  );
}
