import { Link } from "react-router-dom";
import { Section } from "../common/Section";
import type { Project } from "../../models/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section
      id="projects"
      eyebrow="05 / progetti"
      title="Progetti selezionati."
      intro="Una selezione dei repository piu' rappresentativi, con utility concrete, applicazioni full-stack e strumenti pensati per semplificare flussi reali."
      aside={<span className="section__pill">{projects.length} progetti</span>}
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <p className="project-card__status">{project.status}</p>
            <h3>{project.title}</h3>
            <p className="project-card__summary">{project.summary}</p>
            <ul className="tag-list" aria-label={`${project.title} stack`}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="project-card__actions">
              <Link className="text-link" to={`/projects/${project.slug}`}>
                apri dettaglio
              </Link>
              <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">
                repository
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
