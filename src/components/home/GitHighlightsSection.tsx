import { Section } from "../common/Section";
import type { GitHighlight } from "../../models/portfolio";

interface GitHighlightsSectionProps {
  highlights: GitHighlight[];
}

export function GitHighlightsSection({ highlights }: GitHighlightsSectionProps) {
  return (
    <Section
      id="git"
      eyebrow="05 / git"
      title="Interface language borrowed from the command line."
      intro="The coding motif is intentional rather than decorative noise: it helps structure the reading flow across the page."
    >
      <div className="git-grid">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="git-card">
            <p className="git-card__label">{highlight.label}</p>
            <h3>{highlight.title}</h3>
            <p>{highlight.detail}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
