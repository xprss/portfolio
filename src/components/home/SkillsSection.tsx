import { Section } from "../common/Section";
import type { SkillGroup } from "../../models/portfolio";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      eyebrow="03 / competenze"
      title="Uno stack costruito su progetti reali."
      intro="Le competenze sono raggruppate nel modo in cui emergono davvero dal lavoro: interfacce, ingegneria di prodotto e base tecnica trasversale."
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
