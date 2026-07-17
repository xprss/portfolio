import { Section } from "../common/Section";
import type { SkillGroup } from "../../models/portfolio";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      eyebrow="02 / stack"
      title="A toolkit shaped for shipping."
      intro="Capabilities are grouped the way real work happens: interface craft, product engineering, and release discipline."
    >
      <div className="card-grid">
        {groups.map((group) => (
          <article key={group.title} className="info-card">
            <p className="info-card__label">{group.title}</p>
            <p className="info-card__focus">{group.focus}</p>
            <ul className="tag-list" aria-label={`${group.title} skills`}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
