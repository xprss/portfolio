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
      eyebrow="04 / projects"
      title="Selected builds."
      intro="Projects are displayed like staged changes: concise summary first, deeper detail available in dedicated routes."
      aside={<span className="section__pill">{projects.length} entries</span>}
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
                open diff
              </Link>
              <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">
                source
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
