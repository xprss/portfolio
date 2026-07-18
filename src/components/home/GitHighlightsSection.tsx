import { Section } from "../common/Section";
import type { GitHighlight } from "../../models/portfolio";

interface GitHighlightsSectionProps {
  highlights: GitHighlight[];
}

export function GitHighlightsSection({ highlights }: GitHighlightsSectionProps) {
  return (
    <Section
      id="git"
      eyebrow="06 / git"
      title="Il linguaggio visivo prende spunto dal modo in cui lavoro."
      intro="I riferimenti a branch, diff e terminale non sono decorativi: servono a organizzare la lettura e a dare coerenza tecnica alla presentazione."
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
