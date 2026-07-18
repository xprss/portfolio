import { Section } from "../common/Section";
import type { ExperienceItem } from "../../models/portfolio";

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <Section
      id="experience"
      eyebrow="04 / percorso"
      title="Percorso tecnico raccontato come una cronologia di commit."
      intro="Non solo ruoli formali: qui c'e' il filo che collega studio, prodotto, sperimentazione e costruzione di strumenti utili."
    >
      <div className="timeline">
        {items.map((item) => (
          <article key={`${item.company}-${item.period}`} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__content">
              <div className="timeline__heading">
                <div>
                  <p className="timeline__company">{item.company}</p>
                  <h3>{item.role}</h3>
                </div>
                <span className="timeline__period">{item.period}</span>
              </div>
              <p className="timeline__summary">{item.summary}</p>
              <ul className="timeline__list">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              <ul className="tag-list tag-list--muted" aria-label={`${item.company} stack`}>
                {item.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
